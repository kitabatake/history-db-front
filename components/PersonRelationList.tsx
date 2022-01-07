import {ReactElement, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {confirmAlert} from "react-confirm-alert";
import Dialog from "./Dialog";
import PersonRelationUpdateForm from "./PersonRelationUpdateForm";
import {PersonRelation} from "../types";
import {DocumentNode} from "graphql";

const deletePersonRelationGql = gql`
mutation DeletePersonRelation($id: Int!) {
    deletePersonRelation(id: $id) {
        id
    }
} 
`;

interface Props {
    personRelations: PersonRelation[],
    personRelationsGql: DocumentNode
}

export default function PersonRelationList({personRelations, personRelationsGql}: Props): ReactElement {
    const [deletePersonRelationMutation] = useMutation(deletePersonRelationGql, {
        refetchQueries: [personRelationsGql]
    });
    const [personRelationIdForUpdate, setPersonRelationIdForUpdate] = useState(null);
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
        <>
            <table className="table-auto w-full">
                <thead className="text-xs text-cyan-400 bg-cyan-50 text-left">
                <tr>
                    <th className="p-2">ID</th>
                    <th>説明</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {personRelations.map((personRelation) => (
                    <tr key={personRelation.id}>
                        <td className="p-2 font-medium text-gray-800">{personRelation.id}</td>
                        <td className="p-2 font-medium text-gray-800">{personRelation.description}</td>
                        <td className="space-x-1">
                            <button
                                className="bg-green-100 hover:bg-green-200 text-green-500 py-1 px-2 text-xs rounded border border-green-200"
                                onClick={() => setPersonRelationIdForUpdate(personRelation.id)}
                            >
                                編集
                            </button>
                            <button
                                className="bg-red-100 hover:bg-red-200 text-red-500 py-1 px-2 text-xs rounded border border-red-200"
                                onClick={() => deletePersonRelation(personRelation)}
                            >
                                削除
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Dialog
                open={personRelationIdForUpdate != null}
                onClose={() => setPersonRelationIdForUpdate(null)}
            >
                {personRelationIdForUpdate && (
                    <PersonRelationUpdateForm
                        personRelationId={personRelationIdForUpdate}
                        personRelationsGql={personRelationsGql}
                        onSubmit={() => setPersonRelationIdForUpdate(null)}
                    />
                )}
            </Dialog>
        </>
    )
}