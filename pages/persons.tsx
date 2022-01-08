import {gql, useQuery} from "@apollo/client";
import PersonCreateForm from "../components/PersonCreateForm";
import {ReactElement} from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';
import PersonList from "../components/PersonList";

const personsGql = gql`
query {
    persons {
        id,
        name,
        description
    }
}`;

export default function Persons(): ReactElement {
    const {loading, error, data} = useQuery(personsGql);
    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <PersonCreateForm refetchQueries={[personsGql]}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                {loading && (<p>loading ...</p>)}
                {error && (<p>error ...</p>)}
                {data && (
                   <PersonList
                       persons={data.persons}
                       personsGql={personsGql}
                       refetchQueriesOnDelete={[personsGql]}
                   />
                )}
            </div>
        </div>)
}
