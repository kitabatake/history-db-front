import {gql} from "@apollo/client";

export const GET_PERSON_RELATION_QUERY = gql`
    query GetPersonRelation($id: Int!) {
        personRelation(id: $id) {
            id,
            description,
            persons {
                id,
                name
            }
        }
    }
`;

export const GET_PERSON_RELATIONS_QUERY = gql`
    query GetPersonRelations {
        personRelations {
            id,
            description,
            persons {
                id,
                name
            }
        }
    }
`;

const CREATE_PERSON_RELATION_QUERY = gql`
    mutation CreatePersonRelation($description: String!, $personIds: [Int!]) {
        createPersonRelation(description: $description, personIds: $personIds) {
            id,
            description
        }
    }
`;

const UPDATE_PERSON_RELATION_QUERY = gql`
    mutation UpdatePersonRelation($id: Int!, $description: String!, $personIds: [Int!]) {
        updatePersonRelation(id: $id, description: $description, personIds: $personIds) {
            id
        }
    }
`;

const DELETE_PERSON_RELATIONS_QUERY = gql`
    mutation DeletePersonRelation($id: Int!) {
        deletePersonRelation(id: $id) {
            id
        }
    }
`;

