import {ReactElement, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {confirmAlert} from "react-confirm-alert";
import Dialog from "./Dialog";
import SourceUpdateForm from "./SourceUpdateForm";
import {Source} from "../types";
import {DocumentNode} from "graphql";

const deleteSourceQuery = gql`
mutation DeleteSource($id: Int!) {
    deleteSource(id: $id) {
        id
    }
} 
`;

interface Props {
    sources: Source[],
    sourcesGql: DocumentNode
}

export default function SourceList({sources, sourcesGql}: Props): ReactElement {
    const [sourceIdForUpdate, setSourceIdForUpdate] = useState(null);
    const [deleteSourceMutation] = useMutation(deleteSourceQuery, {
        refetchQueries: [sourcesGql]
    });
    const deleteSource = (source) => {
        confirmAlert({
            message: `出典「${source.name}」を本当に削除しますか？`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteSourceMutation({variables: {id: source.id}})
                },
                {
                    label: 'No',
                    onClick: () => {
                    }
                }
            ]
        });
    }

    return (
        <>
            <table className="table-auto w-full">
                <thead className="text-xs text-cyan-400 bg-cyan-50 text-left">
                <tr>
                    <th className="p-2">ID</th>
                    <th>名前</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {sources.map((source) => (
                    <tr key={source.id}>
                        <td className="p-2 font-medium text-gray-800">{source.id}</td>
                        <td className="p-2 font-medium text-gray-800">{source.name}</td>
                        <td className="space-x-1">
                            <button
                                className="bg-green-100 hover:bg-green-200 text-green-500 py-1 px-2 text-xs rounded border border-green-200"
                                onClick={() => setSourceIdForUpdate(source.id)}
                            >
                                編集
                            </button>
                            <button
                                className="bg-red-100 hover:bg-red-200 text-red-500 py-1 px-2 text-xs rounded border border-red-200"
                                onClick={() => deleteSource(source)}
                            >
                                削除
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Dialog
                open={sourceIdForUpdate != null}
                onClose={() => setSourceIdForUpdate(null)}
            >
                {sourceIdForUpdate && (
                    <SourceUpdateForm
                        sourceId={sourceIdForUpdate}
                        refetchQueries={[sourcesGql]}
                        onSubmit={() => setSourceIdForUpdate(null)}
                    />
                )}
            </Dialog>
        </>
    );
}