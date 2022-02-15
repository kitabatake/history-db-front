import {SelectOption} from "../types/form";
import {apolloClient} from "../../apolloClient";
import {SEARCH_PERSONS_QUERY} from "../../graphqls/search";
import {Person} from "../../src/generated/graphql";

export const loadPersonOptions = (input: string, callback: (options: SelectOption[]) => void) => {
    if (!input) {
        return Promise.resolve({options: []});
    }

    return apolloClient.query({
        query: SEARCH_PERSONS_QUERY,
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