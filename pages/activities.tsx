import Head from 'next/head'
import {gql, useMutation, useQuery} from "@apollo/client";
import {ReactElement} from "react";
import ActivityCreateForm from "../components/ActivityCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {confirmAlert} from "react-confirm-alert";

const activitiesQuery = gql`
query {
    activities {
        id,
        description
    }
}`;

const deleteActivityQuery = gql`
mutation DeleteActivity($id: Int!) {
    deleteActivity(id: $id) {
        id
    }
} 
`;

export default function Activitys(): ReactElement {
    const {loading, error, data} = useQuery(activitiesQuery);
    const [deleteActivityMutation] = useMutation(deleteActivityQuery, {
        refetchQueries: [activitiesQuery]
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
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <ActivityCreateForm activitiesGql={activitiesQuery}/>
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
                        {data.activities.map((activity) => (
                            <tr key={activity.id}>
                                <td className="p-2 font-medium text-gray-800">{activity.id}</td>
                                <td className="p-2 font-medium text-gray-800">{activity.description}</td>
                                <td>
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
            </div>
        </div>
    )
}
