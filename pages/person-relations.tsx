import {gql, useQuery} from "@apollo/client";
import {ReactElement} from "react";
import PersonRelationCreateForm from "../components/PersonRelationCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import PersonRelationList from "../components/PersonRelationList";
import {PersonRelation} from "../types";

const personRelationsGql = gql`
query {
    personRelations {
        id,
        description,
        persons {
            id,
            name
        }
    }
}`;

interface personRelationsQueryData {
    personRelations: PersonRelation[]
}


export default function PersonRelations(): ReactElement {
    const {loading, error, data} = useQuery<personRelationsQueryData>(personRelationsGql);

    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <PersonRelationCreateForm refetchQueries={[personRelationsGql]}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                {loading && (<p>loading ...</p>)}
                {error && (<p>error ...</p>)}
                {data && (
                    <PersonRelationList
                        personRelations={data.personRelations}
                        personRelationsGql={personRelationsGql}
                    />
                )}
            </div>
        </div>
    )
}
