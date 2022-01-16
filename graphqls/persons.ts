import {gql} from "@apollo/client";

export const GET_PERSON_QUERY = gql`
    query getPerson($id: Int!) {
        person(id: $id) {
            id,
            name,
            description
        }
    }
`;

export const GET_PERSON_WITH_DETAILS_QUERY = gql`
    query getPersonWithDetails($id: Int!) {
        person(id: $id) {
            id,
            name,
            description,
            relations {
                id,
                description,
                persons {
                    id,
                    name
                }
            },
            activities {
                id,
                description,
                persons {
                    id,
                    name
                }
            },
            aliases {
                id,
                alias
            }
        }
    }`;

export const GET_PERSONS_QUERY = gql`
    query GetPersons {
        persons {
            id,
            name,
            description
        }
    }
`;

const DELETE_PERSON_QUERY = gql`
    mutation DeletePerson($id: Int!) {
        deletePerson(id: $id) {
            id
        }
    }
`;

const CREATE_PERSON_QUERY = gql`
    mutation CreatePerson($name: String!, $description: String!) {
        createPerson(name: $name, description: $description) {
            id,
            name
        }
    }
`;

const UPDATE_PERSON_QUERY = gql`
    mutation UpdatePerson($id: Int!, $name: String!, $description: String!) {
        updatePerson(id: $id, name: $name, description: $description) {
            id
        }
    }
`;


