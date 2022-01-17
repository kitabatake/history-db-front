import {ReactElement} from "react";
import PersonRelationCreateForm from "../components/form/PersonRelationCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import PersonRelationList from "../components/PersonRelationList";
import {GET_PERSON_RELATIONS_QUERY} from "../graphqls/personRelations";

export default function PersonRelations(): ReactElement {
    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <PersonRelationCreateForm refetchQueriesOnCreate={[GET_PERSON_RELATIONS_QUERY]}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                <PersonRelationList />
            </div>
        </div>
    )
}
