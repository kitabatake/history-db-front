import {gql} from "@apollo/client";

export const GET_PERSON_ALIASES_QUERY = gql`
    query getPersonAliases($personId: Int!) {
        personAliases(personId: $personId) {
            id,
            alias
        }
    }`;

export const CREATE_PERSON_ALIAS_QUERY = gql`
    mutation CreatePersonAlias($personId: Int!, $alias: String!) {
        createPersonAlias(personId: $personId, alias: $alias) {
            id
        }
    }
`;

export const DELETE_PERSON_ALIAS_QUERY = gql`
    mutation DeletePersonAlias($id: Int!) {
        deletePersonAlias(id: $id) {
            id
        }
    }
`;