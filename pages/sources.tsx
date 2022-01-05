import {gql, useMutation, useQuery} from "@apollo/client";
import {ReactElement} from "react";
import SourceCreateForm from "../components/SourceCreateForm";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const sourcesQuery = gql`
query {
    sources {
        id,
        name
    }
}`;

const deleteSourceQuery = gql`
mutation DeleteSource($id: Int!) {
    deleteSource(id: $id) {
        id
    }
} 
`;

export default function Sources(): ReactElement {
    const {loading, error, data} = useQuery(sourcesQuery);
    const [deleteSourceMutation] = useMutation(deleteSourceQuery, {
        refetchQueries: [sourcesQuery]
    });

    const deleteSource = (source) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: `出典「${source.name}」を本当に削除しますか？`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteSourceMutation({variables: {id: source.id}})
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }

    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <SourceCreateForm sourcesGql={sourcesQuery}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                {loading && (<p>loading ...</p>)}
                {error && (<p>error ...</p>)}
                {data && (
                    <table className="table-auto w-full">
                        <thead className="text-xs text-cyan-400 bg-cyan-50 text-left">
                        <tr>
                            <th className="p-2">ID</th>
                            <th>名前</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {data.sources.map((source) => (
                            <tr key={source.id}>
                                <td className="p-2 font-medium text-gray-800">{source.id}</td>
                                <td className="p-2 font-medium text-gray-800">{source.name}</td>
                                <td>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-xs rounded"
                                        onClick={() => deleteSource(source)}
                                    >
                                        削除
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
