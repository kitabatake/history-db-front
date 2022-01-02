import Head from 'next/head'
import Header from "../components/Header";
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

    return (<div>
        <ActivityCreateForm activitiesGql={activitiesQuery}/>
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mt-5">
            {loading && (<p>loading ...</p>)}
            {error && (<p>error ...</p>)}
            {data && (
                <table className="table-auto w-full">
                    <tbody>
                    {data.activities.map((activity) => (
                        <tr key={activity.id}>
                            <td className="p-2 font-medium text-gray-800">{activity.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>)
}
