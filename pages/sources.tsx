import Head from 'next/head'
import Header from "../components/Header";
import {gql, useQuery} from "@apollo/client";
import {ReactElement} from "react";
import SourceCreateForm from "../components/SourceCreateForm";

const sourcesQuery = gql`
query {
    sources {
        id,
        name
    }
}`;

export default function Sources(): ReactElement {
    const {loading, error, data} = useQuery(sourcesQuery);

    return (<div>
        <SourceCreateForm sourcesGql={sourcesQuery}/>
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mt-5">
            {loading && (<p>loading ...</p>)}
            {error && (<p>error ...</p>)}
            {data && (
                <table className="table-auto w-full">
                    <tbody>
                    {data.sources.map((source) => (
                        <tr key={source.id}>
                            <td className="p-2 font-medium text-gray-800">{source.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>)
}
