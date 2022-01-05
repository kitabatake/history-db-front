import {gql, useMutation, useQuery} from "@apollo/client";
import {ReactElement} from "react";
import PersonRelationCreateForm from "../components/PersonRelationCreateForm";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const personRelationsQuery = gql`
query {
    personRelations {
        id,
        description
    }
}`;

const deletePersonRelationQuery = gql`
mutation DeletePersonRelation($id: Int!) {
    deletePersonRelation(id: $id) {
        id
    }
} 
`;

export default function PersonRelations(): ReactElement {
    const {loading, error, data} = useQuery(personRelationsQuery);
    const [deletePersonRelationMutation] = useMutation(deletePersonRelationQuery, {
        refetchQueries: [personRelationsQuery]
    });
    const deletePersonRelation = (personRelation) => {
        confirmAlert({
            message: `本当に削除しますか？`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deletePersonRelationMutation({variables: {id: personRelation.id}})
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
                <PersonRelationCreateForm personRelationsGql={personRelationsQuery}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                {loading && (<p>loading ...</p>)}
                {error && (<p>error ...</p>)}
                {data && (
                    <table className="table-auto w-full">
                        <thead className="text-xs text-cyan-400 bg-cyan-50 text-left">
                        <tr>
                            <th className="p-2">ID</th>
                            <th>説明</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {data.personRelations.map((personRelation) => (
                            <tr key={personRelation.id}>
                                <td className="p-2 font-medium text-gray-800">{personRelation.id}</td>
                                <td className="p-2 font-medium text-gray-800">{personRelation.description}</td>
                                <td>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-xs rounded"
                                        onClick={() => deletePersonRelation(personRelation)}
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
