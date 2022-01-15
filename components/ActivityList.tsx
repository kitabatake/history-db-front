import {ReactElement, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import Dialog from "./Dialog";
import ActivityUpdateForm from "./ActivityUpdateForm";
import {useDeleteActivityMutation, useGetActivitiesQuery} from "../src/generated/graphql";
import Link from "next/link";
import {GET_ACTIVITIES_QUERY} from "../graphqls/activitie";

export default function ActivityList(): ReactElement {
    const {loading, error, data} = useGetActivitiesQuery();
    const [activityIdForUpdate, setActivityIdForUpdate] = useState(null);
    const [deleteActivityMutation] = useDeleteActivityMutation({
        refetchQueries: [GET_ACTIVITIES_QUERY]
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
                    onClick: () => {
                    }
                }
            ]
        });
    }
    return (
        <>
            {loading && (<p>loading ...</p>)}
            {error && (<p>error ...</p>)}
            {data && (
                <table className="table-auto w-full">
                    <thead className="text-xs text-cyan-400 bg-cyan-50 text-left">
                    <tr>
                        <th className="p-2">ID</th>
                        <th>説明</th>
                        <th>人物</th>
                        <th>日時</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {data.activities.map((activity) => (
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
                            <td>
                                {activity.year && (<span>{activity.year}年</span>)}
                                {activity.month && (<span>{activity.month}月</span>)}
                                {activity.day && (<span>{activity.day}日</span>)}
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
            )}
            <Dialog
                open={activityIdForUpdate != null}
                onClose={() => setActivityIdForUpdate(null)}
            >
                {activityIdForUpdate && (
                    <ActivityUpdateForm
                        activityId={activityIdForUpdate}
                        refetchQueriesOnUpdate={[GET_ACTIVITIES_QUERY]}
                        onSubmit={() => setActivityIdForUpdate(null)}
                    />
                )}
            </Dialog>
        </>
    )
}