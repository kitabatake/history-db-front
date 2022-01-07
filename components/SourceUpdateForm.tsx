import {gql, useMutation, useQuery} from "@apollo/client";
import {ReactElement} from "react";
import {DocumentNode} from "graphql";
import SourceForm, {SourceFormData} from "./SourceForm";
import {Source} from "../types";

const updateSourceQuery = gql`
mutation UpdateSource($id: Int!, $name: String!) {
    updateSource(id: $id, name: $name) {
        id,
        name
    }
} 
`;

const getSourceQuery = gql`
query getSource($id: Int!) {
    source(id: $id) {
        id,
        name
    }
} 
`;

interface updateSourceVariables {
    id: number,
    name: string
}


interface Props {
    sourceId: number,
    sourcesGql: DocumentNode,
    onSubmit: () => void
}

export default function SourceUpdateForm({sourceId, sourcesGql, onSubmit}: Props): ReactElement {
    const [updateSource] = useMutation<Source, updateSourceVariables>(updateSourceQuery, {
        refetchQueries: [sourcesGql]
    });
    const {data} = useQuery(getSourceQuery, {variables: {id: sourceId}});

    return (
        <>
            <div className="font-medium text-center text-lg text-gold-800">
                出典編集
            </div>
            {data && (
                <SourceForm
                    defaultData={{name: data.source.name}}
                    onSubmit={(data: SourceFormData) => {
                        updateSource({variables: {id: sourceId, name: data.name}});
                        onSubmit();
                    }}
                />
            )}
        </>
    )
}