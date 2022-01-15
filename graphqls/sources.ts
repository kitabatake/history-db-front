import {gql} from "@apollo/client";

const GET_SOURCE_QUERY = gql`
    query getSource($id: Int!) {
        source(id: $id) {
            id,
            name
        }
    }
`;

export const GET_SOURCES_QUERY = gql`
    query getSources {
        sources {
            id,
            name
        }
    }`;

export const SEARCH_SOURCES_QUERY = gql`
    query SearchSources($nameForSearch: String!) {
        sources(nameForSearch: $nameForSearch) {
            id,
            name
        }
    }
`;

export const CREATE_SOURCE_QUERY = gql`
    mutation CreateSource($name: String!) {
        createSource(name: $name) {
            id,
            name
        }
    }
`;

export const UPDATE_SOURCE_QUERY = gql`
    mutation UpdateSource($id: Int!, $name: String!) {
        updateSource(id: $id, name: $name) {
            id,
            name
        }
    }
`;

export const DELETE_SOURCE_QUERY = gql`
    mutation DeleteSource($id: Int!) {
        deleteSource(id: $id) {
            id
        }
    }
`;