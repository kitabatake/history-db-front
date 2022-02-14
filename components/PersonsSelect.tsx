import {ReactElement} from "react";
import AsyncSelect from "react-select/async";
import {apolloClient} from "../apolloClient";
import {gql} from "@apollo/client";

type Option = { label: string, value: number }
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

interface PersonsSelectProps {
    value: Option[],
    onChange: (Option) => void,
}

export const PersonsSelect = ({value, onChange}: PersonsSelectProps): ReactElement => {
    return (
        <AsyncSelect<Option, true>
            loadOptions={loadPersonOptions}
            isMulti
            value={value}
            onChange={onChange}
        />
    )
}

interface PersonSelectProps {
    value: Option,
    onChange: (Option) => void,
}

export const PersonSelect = ({value, onChange}: PersonSelectProps): ReactElement => {
    return (
        <AsyncSelect<Option, false>
            loadOptions={loadPersonOptions}
            value={value}
            onChange={onChange}
        />
    )
}