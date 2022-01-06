import {gql, useQuery} from "@apollo/client";
import {ReactElement} from "react";
import SourceCreateForm from "../components/SourceCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import SourceList from "../components/SourceList";

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
                {data && (<SourceList sources={data.sources} sourcesGql={sourcesQuery} />)}
            </div>
        </div>
    )
}
