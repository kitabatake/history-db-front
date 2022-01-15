import {ReactElement} from "react";
import ActivityCreateForm from "../components/ActivityCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import ActivityList from "../components/ActivityList";
// import {Activity} from "../types";
import {useGetActivitiesQuery} from "../src/generated/graphql";
import {GET_ACTIVITIES_QUERY} from "../graphqls/activitie";

export default function Activities(): ReactElement {
    const {loading, error, data} = useGetActivitiesQuery();

    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <ActivityCreateForm refetchQueries={[GET_ACTIVITIES_QUERY]}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                {loading && (<p>loading ...</p>)}
                {error && (<p>error ...</p>)}
                {data && (
                    <ActivityList
                        activities={data.activities}
                        activitiesGql={GET_ACTIVITIES_QUERY}
                    />
                )}
            </div>
        </div>
    )
}
