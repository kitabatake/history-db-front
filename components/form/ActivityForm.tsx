import {ReactElement} from "react";
import AsyncSelect from "react-select/async";
import PersonsSelect from "../PersonsSelect";
import {apolloClient} from "../../apolloClient";
import {range} from "../../lib/util";
import {SEARCH_SOURCES_QUERY} from "../../graphqls/sources";
import {Controller, useForm} from "react-hook-form";

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
    const {register, control, reset, handleSubmit, formState: {errors}} = useForm<ActivityFormData>();
    return (
        <form
            className="mt-2"
            onSubmit={handleSubmit(data => {
                onSubmit({
                    description: data.description,
                    persons: data.persons,
                    source: data.source,
                    year: data.year,
                    month: data.month,
                    day: data.day,
                });
                reset();
            })}
        >
            <div className="mb-2">
                <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                    概要:
                </label>
                <textarea
                    {...register("description")}
                    className="text-sm p-2 rounded-lg border border-gold-200 bg-gold-50 w-full shrink focus:outline-none focus:border-gold-400"
                    defaultValue={defaultData.description}
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
                            {...register("year", {valueAsNumber: true})}
                            className="text-sm p-1 rounded-lg border border-gold-200 bg-gold-50 w-12 focus:outline-none focus:border-gold-400"
                            defaultValue={defaultData.year}
                        />
                        <span className="font-xs ml-1">年</span>
                    </div>
                    <div>
                        <select
                            className="text-sm p-1 rounded-lg border border-gold-200 bg-gold-50 w-12 focus:outline-none focus:border-gold-400"
                            {...register("month", {valueAsNumber: true})}
                            defaultValue={defaultData.month}
                        >
                            <option></option>
                            {range(1, 12).map(n => (<option key={n} value={n}>{n}</option>))}
                        </select>
                        <span className="font-xs ml-1">月</span>
                    </div>
                    <div>
                        <select
                            className="text-sm p-1 rounded-lg border border-gold-200 bg-gold-50 w-12 focus:outline-none focus:border-gold-400"
                            {...register("day", {valueAsNumber: true})}
                            defaultValue={defaultData.day}
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
                <Controller
                    name="source"
                    control={control}
                    defaultValue={defaultData.source}
                    render={({ field }) =>(
                        <AsyncSelect
                            {...field}
                            loadOptions={loadSourceOptions}
                        />
                    )}
                />

            </div>
            <div className="mb-3">
                <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                    人物:
                </label>
                <Controller
                    name="persons"
                    control={control}
                    defaultValue={defaultData.persons}
                    render={({ field }) =>(
                        <PersonsSelect
                            {...field}
                        />
                    )}
                />
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