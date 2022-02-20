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
            aliases,
            relatedPersons {
                id,
                label,
                direction,
                person {
                    id,
                    name
                }
            }
            activities {
                id,
                description
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

const REMOVE_RELATED_PERSON = gql`
    mutation RemoveRelatedPerson($id: Int!) {
        removeRelatedPerson(id: $id)
    }
`

const UPDATE_PERSON_QUERY = gql`
    mutation UpdatePerson($id: Int!, $name: String!, $description: String!) {
        updatePerson(id: $id, name: $name, description: $description) {
            id
        }
    }
`;

const ADD_PERSON_ALIAS_QUERY = gql`
    mutation AddPersonAlias($personId: Int!, $alias: String!) {
        addPersonAlias(personId: $personId, alias: $alias) {
            id,
            name
        }
    }
`;

const REMOVE_PERSON_ALIAS_QUERY = gql`
    mutation RemovePersonAlias($personId: Int!, $alias: String!) {
        removePersonAlias(personId: $personId, alias: $alias) {
            id,
            name
        }
    }
`;

const ADD_RELATED_PERSON_QUERY = gql`
    mutation AddRelatedPerson($fromId: Int!, $toId: Int!, $label: String!) {
        addRelatedPerson(fromId: $fromId, toId: $toId, label: $label) {
            id
        }
    }
`;

const ADD_RELATIONSHI_TO_ACTIVITY = gql`
    mutation AddRelationshipToActivity($personId: Int!, $activityId: Int!, $label: String!) {
        addRelationshipToActivity(personId:$personId, activityId:$activityId, label: $label){
            id
        }
    }
`;