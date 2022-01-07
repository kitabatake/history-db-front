import {DocumentNode} from "graphql";
import {ReactElement, useState} from "react";
import PersonsSelect from "./PersonsSelect";

export interface PersonRelationFormData {
    description: string,
    persons: Array<{value: number, label: string}>
}
interface Props {
    defaultData?: PersonRelationFormData,
    onSubmit: (PersonRelationFormData) => void
}

export default function PersonRelationForm({defaultData = {description: "", persons: []}, onSubmit}: Props): ReactElement {
    const [description, setDescription] = useState(defaultData.description);
    const [selectedPersons, setSelectedPersons] = useState(defaultData.persons);
    return (
        <form
            className="mt-2"
            onSubmit={e => {
                e.preventDefault();
                setDescription('');
                setSelectedPersons([]);
                onSubmit({
                    description: description,
                    persons: selectedPersons
                });
            }}
        >
            <div className="mb-2">
                <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                    概要:
                </label>
                <input
                    type="text"
                    name="description"
                    className="text-sm p-2 rounded-lg border border-gold-200 bg-gold-50 w-full shrink focus:outline-none focus:border-gold-400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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