import {gql} from "@apollo/client";

export const GET_GRAPH_QUERY = gql`
    query getGraph($targetNodeId: Int!) {
        graph(targetNodeId: $targetNodeId) {
            nodes {
                id,
                name,
                label,
            }
            edges {
                source,
                target,
                relationship,
            }
        }
    }
`;