import {gql, useMutation} from "@apollo/client";
import {ReactElement, useState} from "react";
import PropTypes from 'prop-types'
import AsyncSelect from 'react-select/async';
import {apolloClient} from "../apolloClient";

const create_activity_query = gql`
mutation CreateActivity($description: String!, $source_id: Int) {
    createActivity(description: $description, source_id: $source_id, person_ids: []) {
        id,
        description
    }
} 
`;

const search_sources_query = gql`
query SearchSources($nameForSearch: String!) {
    sources(nameForSearch: $nameForSearch) {
        id,
        name
    }
} 
`;

function loadSourceOptions(input, callback) {
    if (!input) {
        return Promise.resolve({options: []});
    }

    return apolloClient.query({
        query: search_sources_query,
        variables: {nameForSearch: input}
    }).then((response) => {
        callback(response.data.sources.map(source => {
            return {
                value: source.id,
                label: source.name
            };
        }))
    });
}

function ActivityCreateForm({activities_gql}): ReactElement {
    const [createActivity] = useMutation(create_activity_query, {
        refetchQueries: [activities_gql]
    });
    const [description, setDescription] = useState("");
    const [source_id, setSourceId] = useState(null);

    return (
        <div className="mt-5 flex flex-col bg-white shadow-md px-8 py-6 rounded-3xl w-50 max-w-md">
            <div className="font-medium self-center text-xl text-gray-800">
                アクティビティ登録
            </div>
            <form
                className="mt-2"
                onSubmit={e => {
                    e.preventDefault();
                    createActivity({variables: {description: description, source_id: source_id}});
                    setDescription('');
                    setSourceId(null);
                }}
            >
                <div className="mb-2">
                    <label className="mb-1 text-xs tracking-wide text-gray-600 w-12">
                        概要:
                    </label>
                    <textarea
                        name="description"
                        className="text-sm p-2 rounded-2xl border border-gray-400 bg-gray-50 w-full shrink focus:outline-none focus:border-blue-400"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="mb-1 text-xs tracking-wide text-gray-600 w-12">
                        出典:
                    </label>
                    <AsyncSelect
                        name="source_id"
                        loadOptions={loadSourceOptions}
                        value={source_id}
                        onChange={(option) => setSourceId(option.value)}
                    />
                </div>
                <div className="flex w-20 mx-auto">
                    <button
                        type="submit"
                        className="focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition
                                      duration-150  ease-in"
                    >
                        送信
                    </button>
                </div>
            </form>
        </div>
    )
}

ActivityCreateForm.propTypes = {
    activities_gql: PropTypes.object
}

export default ActivityCreateForm;