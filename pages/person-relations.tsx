import Head from 'next/head'
import Header from "../components/Header";
import {gql, useQuery} from "@apollo/client";
import PersonCreateForm from "../components/PersonCreateForm";
import {ReactElement, useState} from "react";
import {apolloClient} from "../apolloClient";
import PersonRelationCreateForm from "../components/PersonRelationCreateForm";

const personRelationsQuery = gql`
query {
    personRelations {
        id,
        description
    }
}`;

export default function PersonRelations(): ReactElement {
    const {loading, error, data} = useQuery(personRelationsQuery);

    return (<div>
        <PersonRelationCreateForm personRelationsGql={personRelationsQuery}/>
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mt-5">
            {loading && (<p>loading ...</p>)}
            {error && (<p>error ...</p>)}
            {data && (
                <table className="table-auto w-full">
                    <tbody>
                    {data.personRelations.map((personRelation) => (
                        <tr key={personRelation.id}>
                            <td className="p-2 font-medium text-gray-800">{personRelation.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>)
}
