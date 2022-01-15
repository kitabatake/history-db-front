import PersonCreateForm from "../components/PersonCreateForm";
import {ReactElement} from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';
import PersonList from "../components/PersonList";
import {GET_PERSONS_QUERY} from "../graphqls/persons";

export default function Persons(): ReactElement {
    // const {loading, error, data} = useGetPersonsQuery();
    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <PersonCreateForm refetchQueriesOnCreate={[GET_PERSONS_QUERY]}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                <PersonList />
            </div>
        </div>)
}
