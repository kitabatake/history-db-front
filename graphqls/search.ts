import {gql} from "@apollo/client";

export const SEARCH_PERSONS_QUERY = gql`
    query SearchPersons($nameForSearch: String!) {
        persons(nameForSearch: $nameForSearch) {
            id,
            name
        }
    }
`;