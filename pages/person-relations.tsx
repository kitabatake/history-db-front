import {ReactElement} from "react";
import PersonRelationCreateForm from "../components/PersonRelationCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import PersonRelationList from "../components/PersonRelationList";
import {useGetPersonRelationsQuery} from "../src/generated/graphql";
import {GET_PERSON_RELATIONS_QUERY} from "../graphqls/personRelations";

export default function PersonRelations(): ReactElement {
    const {loading, error, data} = useGetPersonRelationsQuery();

    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <PersonRelationCreateForm refetchQueries={[GET_PERSON_RELATIONS_QUERY]}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                {loading && (<p>loading ...</p>)}
                {error && (<p>error ...</p>)}
                {data && (
                    <PersonRelationList
                        personRelations={data.personRelations}
                        refetchQueriesOnDelete={[GET_PERSON_RELATIONS_QUERY]}
                    />
                )}
            </div>
        </div>
    )
}
