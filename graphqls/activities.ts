import {gql} from "@apollo/client";

export const GET_ACTIVITIES_QUERY = gql`
    query GetActivities {
        activities {
            id,
            name,
            description,
        }
}`;

export const SEARCH_ACTIVITIES_QUERY = gql`
    query SearchActivities($nameForSearch: String!) {
        activities(nameForSearch: $nameForSearch) {
            id,
            name
        }
    }
`;

//
// export const GET_ACTIVITY_QUERY = gql`
//     query getActivity($id: Int!) {
//         activity(id: $id) {
//             id,
//             description,
//             year,
//             month,
//             day,
//             persons {
//                 id,
//                 name
//             },
//             source {
//                 id,
//                 name
//             }
//         }
//     }
// `;

export const CREATE_ACTIVITY_QUERY = gql`
    mutation CreateActivity($name: String!, $description: String) {
        createActivity(name: $name, description: $description) {
            id
        }
    }
`;

// export const UPDATE_ACTIVITY_QUERY = gql`
//     mutation UpdateActivity($id: Int!, $description: String!, $sourceId: Int, $personIds: [Int!], $year: Int, $month: Int, $day: Int) {
//         updateActivity(id: $id, description: $description, sourceId: $sourceId, personIds: $personIds, year: $year, month: $month, day: $day) {
//             id
//         }
//     }
// `;

export const DELETE_ACTIVITY_QUERY = gql`
    mutation DeleteActivity($id: Int!) {
        deleteActivity(id: $id)
    }
`;