import {ReactElement} from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import {apolloClient} from "../apolloClient";
import {gql} from "@apollo/client";

type Option = {label: string, value: number}
const searchPersonsQuery = gql`
query SearchPersons($nameForSearch: String!) {
    persons(nameForSearch: $nameForSearch) {
        id,
        name
    }
} 
`;

function loadPersonOptions(input, callback) {
    if (!input) {
        return Promise.resolve({options: []});
    }

    return apolloClient.query({
        query: searchPersonsQuery,
        variables: {nameForSearch: input}
    }).then((response) => {
        callback(response.data.persons.map(person => {
            return {
                value: person.id,
                label: person.name
            };
        }))
    });
}

function PersonsSelect({onChange}): ReactElement {
    return (
        <AsyncSelect<Option, true>
            loadOptions={loadPersonOptions}
            isMulti
            onChange={(options: readonly Option[]) => {
                onChange(options.map(option => option.value))
            }}
        />
    )
}

PersonsSelect.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default PersonsSelect;