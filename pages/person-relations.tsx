import Head from 'next/head'
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

    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <PersonRelationCreateForm personRelationsGql={personRelationsQuery}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                {loading && (<p>loading ...</p>)}
                {error && (<p>error ...</p>)}
                {data && (
                    <table className="table-auto w-full">
                        <thead className="text-xs text-cyan-400 bg-cyan-50 text-left">
                        <tr>
                            <th className="p-2">ID</th>
                            <th>説明</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {data.personRelations.map((personRelation) => (
                            <tr key={personRelation.id}>
                                <td className="p-2 font-medium text-gray-800">{personRelation.id}</td>
                                <td className="p-2 font-medium text-gray-800">{personRelation.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
