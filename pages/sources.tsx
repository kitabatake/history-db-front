import {ReactElement} from "react";
import SourceCreateForm from "../components/SourceCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import SourceList from "../components/SourceList";
import {useGetSourcesQuery} from "../src/generated/graphql";
import {GET_SOURCES_QUERY} from "../graphqls/sources";

export default function Sources(): ReactElement {
    const {loading, error, data} = useGetSourcesQuery();

    return (
        <div className="flex gap-x-5 w-full">
            <div className="w-30">
                <SourceCreateForm refetchQueries={[GET_SOURCES_QUERY]}/>
            </div>
            <div className="grow bg-white shadow-md rounded-lg">
                {loading && (<p>loading ...</p>)}
                {error && (<p>error ...</p>)}
                {data && (<SourceList sources={data.sources} sourcesGql={GET_SOURCES_QUERY} />)}
            </div>
        </div>
    )
}
