import {gql, useQuery} from "@apollo/client";
import {ReactElement} from "react";
import ActivityCreateForm from "../components/ActivityCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import ActivityList from "../components/ActivityList";
import {Activity} from "../types";

const activitiesGql = gql`
query {
    activities {
        id,
        description,
        year,
        month,
        day,
        persons {
            id,
            name
        }
    }
}`;

interface activitiesQueryData {
    activities: Activity[]
}

export default function Activities(): ReactElement {
    const {loading, error, data} = useQuery<activitiesQueryData>(activitiesGql);

    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <ActivityCreateForm refetchQueries={[activitiesGql]}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                {loading && (<p>loading ...</p>)}
                {error && (<p>error ...</p>)}
                {data && (
                    <ActivityList
                        activities={data.activities}
                        activitiesGql={activitiesGql}
                    />
                )}
            </div>
        </div>
    )
}
