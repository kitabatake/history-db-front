import {ReactElement} from "react";
import AsyncSelect from "react-select/async";
import {apolloClient} from "../apolloClient";
import {gql} from "@apollo/client";
import {MultiValue} from "react-select";
import {Person} from "../src/generated/graphql";
import {SelectOption} from "../lib/types/form";

const searchPersonsQuery = gql`
    query SearchPersons($nameForSearch: String!) {
        persons(nameForSearch: $nameForSearch) {
            id,
            name
        }
    }
`;

function loadPersonOptions(input: string, callback: (options: SelectOption[]) => void) {
    if (!input) {
        return Promise.resolve({options: []});
    }

    return apolloClient.query({
        query: searchPersonsQuery,
        variables: {nameForSearch: input}
    }).then((response) => {
        callback(response.data.persons.map((person: Person) => {
            return {
                value: person.id,
                label: person.name
            };
        }))
    });
}

interface PersonsSelectProps {
    value: SelectOption[],
    onChange: (newValue: SelectOption[]) => void,
}

export const PersonsSelect = ({value, onChange}: PersonsSelectProps): ReactElement => {
    return (
        <AsyncSelect<SelectOption, true>
            loadOptions={loadPersonOptions}
            isMulti
            value={value}
            onChange={onChange as ((newValue: MultiValue<SelectOption>) => void)}
        />
    )
}

interface PersonSelectProps {
    value?: SelectOption,
    onChange: (newValue: SelectOption|null) => void,
}

export const PersonSelect = ({value, onChange}: PersonSelectProps): ReactElement => {
    return (
        <AsyncSelect<SelectOption, false>
            loadOptions={loadPersonOptions}
            value={value}
            onChange={onChange}
        />
    )
}