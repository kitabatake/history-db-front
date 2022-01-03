import {gql, useQuery} from "@apollo/client";
import {ReactElement} from "react";
import SourceCreateForm from "../components/SourceCreateForm";
import PersonRelationCreateForm from "../components/PersonRelationCreateForm";

const sourcesQuery = gql`
query {
    sources {
        id,
        name
    }
}`;

export default function Sources(): ReactElement {
    const {loading, error, data} = useQuery(sourcesQuery);

    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <SourceCreateForm sourcesGql={sourcesQuery}/>
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
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {data.sources.map((source) => (
                            <tr key={source.id}>
                                <td className="p-2 font-medium text-gray-800">{source.id}</td>
                                <td className="p-2 font-medium text-gray-800">{source.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
