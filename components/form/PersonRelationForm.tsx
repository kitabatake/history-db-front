import {ReactElement} from "react";
import PersonsSelect from "../PersonsSelect";
import {Controller, useForm} from "react-hook-form";

export interface PersonRelationFormData {
    description: string,
    persons: Array<{value: number, label: string}>
}
interface Props {
    defaultData?: PersonRelationFormData,
    onSubmit: (PersonRelationFormData) => void
}

export default function PersonRelationForm({defaultData = {description: "", persons: []}, onSubmit}: Props): ReactElement {
    const {register, control, reset, handleSubmit, formState: {errors}} = useForm<PersonRelationFormData>();
    return (
        <form
            className="mt-2"
            onSubmit={handleSubmit(data => {
                onSubmit({
                    description: data.description,
                    persons: data.persons
                });
                reset();
            })}
        >
            <div className="mb-2">
                <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                    概要:
                </label>
                <input
                    type="text"
                    {...register("description")}
                    defaultValue={defaultData.description}
                    className="text-sm p-2 rounded-lg border border-gold-200 bg-gold-50 w-full shrink focus:outline-none focus:border-gold-400"
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