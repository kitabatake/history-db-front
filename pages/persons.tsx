import Head from 'next/head'
import {gql, useQuery} from "@apollo/client";
import PersonCreateForm from "../components/PersonCreateForm";
import {ReactElement} from "react";

const personsQuery = gql`
query {
    persons {
        id,
        name,
        description
    }
}`;

export default function Persons(): ReactElement {
    const {loading, error, data} = useQuery(personsQuery);

    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <PersonCreateForm personsGql={personsQuery}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                {loading && (<p>loading ...</p>)}
                {error && (<p>error ...</p>)}
                {data && (
                    <table className="table-auto w-full">
                        <thead className="text-xs text-cyan-400 bg-cyan-50 text-left">
                        <tr>
                            <th className="p-2">ID</th>
                            <th>名前</th>
                            <th>説明</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {data.persons.map((person) => (
                            <tr key={person.id}>
                                <td className="p-2 font-medium text-gray-800">{person.id}</td>
                                <td className="p-2 font-medium text-gray-800">{person.name}</td>
                                <td className="p-2 font-medium text-gray-800">{person.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>)
}
