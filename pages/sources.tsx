import {ReactElement} from "react";
import SourceCreateForm from "../components/SourceCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import SourceList from "../components/SourceList";
import {GET_SOURCES_QUERY} from "../graphqls/sources";

export default function Sources(): ReactElement {
    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <SourceCreateForm refetchQueriesOnCreate={[GET_SOURCES_QUERY]}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                <SourceList />
            </div>
        </div>
    )
}
