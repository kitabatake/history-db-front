import {ReactElement} from "react";
import ActivityCreateForm from "../components/form/ActivityCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import ActivityList from "../components/ActivityList";
// import {Activity} from "../types";
import {GET_ACTIVITIES_QUERY} from "../graphqls/activitie";

export default function Activities(): ReactElement {
    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <ActivityCreateForm refetchQueriesOnCreate={[GET_ACTIVITIES_QUERY]}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                <ActivityList />
            </div>
        </div>
    )
}
