import PropTypes from "prop-types";
import SourceUpdateForm from "./SourceUpdateForm";
import {useState} from "react";

export interface SourceFormData {
    name: string
}
interface SourceFormProps {
    defaultData?: SourceFormData,
    onSubmit: (SourceFormData) => void
}

export default function SourceForm({defaultData = {name: ""}, onSubmit}: SourceFormProps) {
    const [name, setName] = useState(defaultData.name);
    return (
        <form
            className="mt-2"
            onSubmit={e => {
                e.preventDefault();
                setName('');
                onSubmit({name: name});
            }}
        >
            <div className="mb-3">
                <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                    名前:
                </label>
                <input
                    type="text"
                    name="name"
                    className="text-sm p-2 rounded-lg border border-gold-200 bg-gold-50 w-full shrink focus:outline-none focus:border-gold-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

