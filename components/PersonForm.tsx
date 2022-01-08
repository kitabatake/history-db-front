import {ReactElement, useState} from "react";

export interface PersonFormData {
    name: string,
    description: string,
}
interface Props {
    defaultData?: PersonFormData,
    onSubmit: (PersonFormData) => void
}

export default function PersonForm({defaultData = {name: "", description: ""}, onSubmit}: Props): ReactElement {
    const [name, setName] = useState(defaultData.name);
    const [description, setDescription] = useState(defaultData.description);
    return (
        <form
            className="mt-2"
            onSubmit={e => {
                e.preventDefault();
                onSubmit({
                    name: name,
                    description: description
                })
                setName('');
                setDescription('');
            }}
        >
            <div className="mb-2">
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
            <div className="mb-3">
                <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                    説明:
                </label>
                <textarea
                    name="description"
                    className="text-sm p-2 rounded-lg border border-gold-200 bg-gold-50 w-full shrink focus:outline-none focus:border-gold-400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
    );
}