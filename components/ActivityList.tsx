import {ReactElement, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {confirmAlert} from "react-confirm-alert";
import Dialog from "./Dialog";
import ActivityUpdateForm from "./ActivityUpdateForm";
import {Activity} from "../types";
import {DocumentNode} from "graphql";
import Link from "next/link";

const deleteActivityQuery = gql`
mutation DeleteActivity($id: Int!) {
    deleteActivity(id: $id) {
        id
    }
} 
`;

interface Props {
    activities: Activity[],
    activitiesGql: DocumentNode
}

export default function ActivityList({activities, activitiesGql}: Props): ReactElement {

    const [activityIdForUpdate, setActivityIdForUpdate] = useState(null);
    const [deleteActivityMutation] = useMutation(deleteActivityQuery, {
        refetchQueries: [activitiesGql]
    });
    const deleteActivity = (activity) => {
        confirmAlert({
            message: `本当に削除しますか？`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteActivityMutation({variables: {id: activity.id}})
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
                    <th>人物</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {activities.map((activity) => (
                    <tr key={activity.id}>
                        <td className="p-2 font-medium text-gray-800">{activity.id}</td>
                        <td className="p-2 font-medium text-gray-800">{activity.description}</td>
                        <td className="p-2 font-medium text-gray-800 space-x-2">
                            {activity.persons && activity.persons.map((person) => {
                                return (
                                    <Link key={person.id} href={`/persons/${person.id}`}>
                                        <a>{person.name}</a>
                                    </Link>
                                )
                            })}
                        </td>
                        <td className="space-x-1">
                            <button
                                className="bg-green-100 hover:bg-green-200 text-green-500 py-1 px-2 text-xs rounded border border-green-200"
                                onClick={() => setActivityIdForUpdate(activity.id)}
                            >
                                編集
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-xs rounded"
                                onClick={() => deleteActivity(activity)}
                            >
                                削除
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Dialog
                open={activityIdForUpdate != null}
                onClose={() => setActivityIdForUpdate(null)}
            >
                {activityIdForUpdate && (
                    <ActivityUpdateForm
                        activityId={activityIdForUpdate}
                        refetchQueries={[activitiesGql]}
                        onSubmit={() => setActivityIdForUpdate(null)}
                    />
                )}
            </Dialog>
        </>
    )
}