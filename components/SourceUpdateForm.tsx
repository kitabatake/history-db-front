import {gql, useMutation, useQuery} from "@apollo/client";
import {ReactElement} from "react";
import {DocumentNode} from "graphql";
import SourceForm, {SourceFormData} from "./SourceForm";

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


interface SourceUpdateFormProps {
    sourceId: number,
    sourcesGql: DocumentNode,
    onSubmit: () => void
}

export default function SourceUpdateForm({sourceId, sourcesGql, onSubmit}: SourceUpdateFormProps): ReactElement {
    const [updateSource] = useMutation(updateSourceQuery, {
        refetchQueries: [sourcesGql]
    });
    const {loading, error, data} = useQuery(getSourceQuery, {variables: {id: sourceId}});

    return (
        <>
            <div className="font-medium text-center text-xl text-gold-800">
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