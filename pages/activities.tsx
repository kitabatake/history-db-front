import Head from 'next/head'
import {gql, useQuery} from "@apollo/client";
import {ReactElement} from "react";
import ActivityCreateForm from "../components/ActivityCreateForm";

const activitiesQuery = gql`
query {
    activities {
        id,
        description
    }
}`;

export default function Activitys(): ReactElement {
    const {loading, error, data} = useQuery(activitiesQuery);

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
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {data.activities.map((activity) => (
                            <tr key={activity.id}>
                                <td className="p-2 font-medium text-gray-800">{activity.id}</td>
                                <td className="p-2 font-medium text-gray-800">{activity.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
