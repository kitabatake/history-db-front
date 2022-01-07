import {gql, useMutation, useQuery} from "@apollo/client";
import {ReactElement} from "react";
import PersonRelationCreateForm from "../components/PersonRelationCreateForm";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import PersonRelationList from "../components/PersonRelationList";

const personRelationsQuery = gql`
query {
    personRelations {
        id,
        description
    }
}`;


export default function PersonRelations(): ReactElement {
    const {loading, error, data} = useQuery(personRelationsQuery);

    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <PersonRelationCreateForm personRelationsGql={personRelationsQuery}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                {loading && (<p>loading ...</p>)}
                {error && (<p>error ...</p>)}
                {data && (
                    <PersonRelationList
                        personRelations={data.personRelations}
                        personRelationsGql={personRelationsQuery}
                    />
                )}
            </div>
        </div>
    )
}
