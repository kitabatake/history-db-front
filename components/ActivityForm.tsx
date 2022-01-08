import {ReactElement, useState} from "react";
import AsyncSelect from "react-select/async";
import PersonsSelect from "./PersonsSelect";
import {apolloClient} from "../apolloClient";
import {gql} from "@apollo/client";

export interface ActivityFormData {
    description: string,
    persons: Array<{value: number, label: string}>,
    source?: {value: number, label: string}
}
interface Props {
    defaultData?: ActivityFormData,
    onSubmit: (ActivityFormData) => void
}

const searchSourcesGql = gql`
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
        query: searchSourcesGql,
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


export default function ActivityForm({defaultData = {description: "", persons: []}, onSubmit}: Props): ReactElement {
    const [description, setDescription] = useState(defaultData.description);
    const [selectedSource, setSelectedSource] = useState(defaultData.source);
    const [selectedPersons, setSelectedPersons] = useState(defaultData.persons);

    return (
        <form
            className="mt-2"
            onSubmit={e => {
                e.preventDefault();
                onSubmit({
                    description: description,
                    persons: selectedPersons,
                    source: selectedSource
                });
                setDescription('');
                setSelectedSource(null);
                setSelectedPersons([]);
            }}
        >
            <div className="mb-2">
                <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                    概要:
                </label>
                <textarea
                    name="description"
                    className="text-sm p-2 rounded-lg border border-gold-200 bg-gold-50 w-full shrink focus:outline-none focus:border-gold-400"
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
                    value={selectedSource}
                    onChange={(option) => setSelectedSource(option)}
                />
            </div>
            <div className="mb-3">
                <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                    人物:
                </label>
                <PersonsSelect
                    value={selectedPersons}
                    onChange={(selected) => setSelectedPersons(selected)} />
            </div>
            <div className="text-center">
                <button
                    type="submit"
                    className="focus:outline-none text-white text-sm bg-gold-500 hover:bg-gold-600 rounded-lg py-1 px-3"
                >
                    送信
                </button>
            </div>
        </form>
    )
}