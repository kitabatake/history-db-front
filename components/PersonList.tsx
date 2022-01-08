import {ReactElement, useState} from "react";
import {Person} from "../types";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {gql, useMutation} from "@apollo/client";
import {confirmAlert} from "react-confirm-alert";
import Link from "next/link";
import Dialog from "./Dialog";
import {DocumentNode} from "graphql";
import {PersonUpdateForm} from "./PersonUpdateForm";

const deletePersonQuery = gql`
mutation DeletePerson($id: Int!) {
    deletePerson(id: $id) {
        id
    }
} 
`;

interface Props {
    persons: Person[],
    personsGql: DocumentNode,
    refetchQueriesOnDelete: RefetchQueryDescriptor[]
}
export default function PersonList({persons, personsGql, refetchQueriesOnDelete}: Props): ReactElement {
    const [personIdForUpdate, setPersonIdForUpdate] = useState(null);
    const [deletePersonMutation] = useMutation(deletePersonQuery, {
        refetchQueries: refetchQueriesOnDelete
    });
    const deletePerson = (person) => {
        confirmAlert({
            message: `人物「${person.name}」を本当に削除しますか？`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deletePersonMutation({variables: {id: person.id}})
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
                    <th className="p-2">名前</th>
                    <th className="p-2">説明</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {persons.map((person) => (
                    <tr key={person.id}>
                        <td className="p-2 font-medium text-gray-800">{person.id}</td>
                        <td className="p-2 font-medium text-gray-800">
                            <Link href={`/persons/${person.id}`}>
                                <a>{person.name}</a>
                            </Link>
                        </td>
                        <td className="p-2 font-medium text-gray-800">{person.description}</td>
                        <td className="space-x-1">
                            <button
                                className="bg-green-100 hover:bg-green-200 text-green-500 py-1 px-2 text-xs rounded border border-green-200"
                                onClick={() => setPersonIdForUpdate(person.id)}
                            >
                                編集
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-xs rounded"
                                onClick={() => deletePerson(person)}
                            >
                                削除
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Dialog
                open={personIdForUpdate != null}
                onClose={() => setPersonIdForUpdate(null)}
            >
                {personIdForUpdate && (
                    <PersonUpdateForm
                        personId={personIdForUpdate}
                        refetchQueries={[personsGql]}
                        onSubmit={() => setPersonIdForUpdate(null)}
                    />
                )}
            </Dialog>
        </>
    );
}