import {ReactElement, useState} from "react";
import AsyncSelect from "react-select/async";
import PersonsSelect from "./PersonsSelect";
import {apolloClient} from "../apolloClient";
import {range} from "../lib/util";
import {SEARCH_SOURCES_QUERY} from "../graphqls/sources";

export interface ActivityFormData {
    description: string,
    persons: Array<{value: number, label: string}>,
    source?: {value: number, label: string},
    year?: number,
    month?: number,
    day?: number
}
interface Props {
    defaultData?: ActivityFormData,
    onSubmit: (ActivityFormData) => void
}

function loadSourceOptions(input, callback) {
    if (!input) {
        return Promise.resolve({options: []});
    }

    return apolloClient.query({
        query: SEARCH_SOURCES_QUERY,
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
    const [year, setYear] = useState(defaultData.year);
    const [month, setMonth] = useState(defaultData.month);
    const [day, setDay] = useState(defaultData.day);
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
                    source: selectedSource,
                    year: year,
                    month: month,
                    day: day,
                });
                setDescription('');
                setSelectedSource(null);
                setSelectedPersons([]);
                setYear(null);
                setMonth(null);
                setDay(null);
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
                <label className="block mb-1 text-xs tracking-wide text-gold-600 w-12">
                    西暦:
                </label>
                <div className="flex gap-1">
                    <div>
                        <input
                            type="text"
                            className="text-sm p-1 rounded-lg border border-gold-200 bg-gold-50 w-12 focus:outline-none focus:border-gold-400"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                        />
                        <span className="font-xs ml-1">年</span>
                    </div>
                    <div>
                        <select
                            className="text-sm p-1 rounded-lg border border-gold-200 bg-gold-50 w-12 focus:outline-none focus:border-gold-400"
                            value={month}
                            onChange={(e) => setMonth(Number(e.target.value))}
                        >
                            <option></option>
                            {range(1, 12).map(n => (<option key={n} value={n}>{n}</option>))}
                        </select>
                        <span className="font-xs ml-1">月</span>
                    </div>
                    <div>
                        <select
                            className="text-sm p-1 rounded-lg border border-gold-200 bg-gold-50 w-12 focus:outline-none focus:border-gold-400"
                            value={day}
                            onChange={(e) => setDay(Number(e.target.value))}
                        >
                            <option></option>
                            {range(1, 31).map(n => (<option key={n} value={n}>{n}</option>))}
                        </select>
                        <span className="font-xs ml-1">日</span>
                    </div>
                </div>
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