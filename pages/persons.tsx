import Head from 'next/head'
import Header from "../components/Header";
import {gql, useQuery} from "@apollo/client";
import PersonCreateForm from "../components/PersonCreateForm";
import {ReactElement} from "react";

const personsQuery = gql`
query {
    persons {
        id,
        name
    }
}`;

export default function Persons(): ReactElement {
    const {loading, error, data} = useQuery(personsQuery);

    return (<div>
        <PersonCreateForm personsGql={personsQuery}/>
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mt-5">
            {loading && (<p>loading ...</p>)}
            {error && (<p>error ...</p>)}
            {data && (
                <table className="table-auto w-full">
                    <tbody>
                    {data.persons.map((person) => (
                        <tr key={person.id}>
                            <td className="p-2 font-medium text-gray-800">{person.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>)
}
