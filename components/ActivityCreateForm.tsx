import {gql, useMutation} from "@apollo/client";
import {ReactElement, useState} from "react";
import PropTypes from 'prop-types'
import AsyncSelect from 'react-select/async';
import {apolloClient} from "../apolloClient";
import PersonsSelect from "./PersonsSelect";

const createActivityQuery = gql`
mutation CreateActivity($description: String!, $source_id: Int, $person_ids: [Int!]) {
    createActivity(description: $description, source_id: $source_id, person_ids: $person_ids) {
        id,
        description
    }
} 
`;

const searchSourcesQuery = gql`
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
        query: searchSourcesQuery,
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

function ActivityCreateForm({activitiesGql: activitiesGql}): ReactElement {
    const [createActivity] = useMutation(createActivityQuery, {
        refetchQueries: [activitiesGql]
    });
    const [description, setDescription] = useState("");
    const [sourceId, setSourceId] = useState(null);
    const [selectedPersons, setSelectedPersons] = useState([]);

    return (
        <div className="flex flex-col bg-white shadow-md px-8 py-6 rounded-lg">
            <div className="font-medium text-xl text-gold-800">
                アクティビティ登録
            </div>
            <form
                className="mt-2"
                onSubmit={e => {
                    e.preventDefault();
                    createActivity({variables: {description: description, source_id: sourceId, person_ids: selectedPersons.map(option => option.value)}});
                    setDescription('');
                    setSourceId(null);
                    setSelectedPersons([]);
                }}
            >
                <div className="mb-2">
                    <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                        概要:
                    </label>
                    <textarea
                        name="description"
                        className="text-sm p-2 rounded-2xl border border-gold-200 bg-gold-50 w-full shrink focus:outline-none focus:border-gold-400"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                        出典:
                    </label>
                    <AsyncSelect
                        name="source_id"
                        loadOptions={loadSourceOptions}
                        value={sourceId}
                        onChange={(option) => setSourceId(option.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                        人物:
                    </label>
                    <PersonsSelect
                        value={selectedPersons}
                        onChange={(selected) => setSelectedPersons(selected)} />
                </div>
                <div className="flex w-20 mx-auto">
                    <button
                        type="submit"
                        className="focus:outline-none text-white tracking-wider text-sm sm:text-base bg-gold-500 hover:bg-gold-600 rounded-lg py-2 w-full transition
                                      duration-150  ease-in mt-2"
                    >
                        送信
                    </button>
                </div>
            </form>
        </div>
    )
}

ActivityCreateForm.propTypes = {
    activitiesGql: PropTypes.object
}

export default ActivityCreateForm;