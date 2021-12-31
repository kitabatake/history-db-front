import {gql, useMutation} from "@apollo/client";
import {ReactElement, useState} from "react";
import PropTypes from 'prop-types'

const createPersonQuery = gql`
mutation CreatePerson($name: String!, $description: String!) {
    createPerson(name: $name, description: $description) {
        id,
        name
    }
} 
`;

function PersonCreateForm({personsGql: personsGql}): ReactElement {
    const [createPerson] = useMutation(createPersonQuery, {
        refetchQueries: [personsGql]
    });

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div className="mt-5 flex flex-col bg-white shadow-md px-8 py-6 rounded-3xl w-50 max-w-md">
            <div className="font-medium self-center text-xl text-gray-800">
                人物登録
            </div>
            <form
                className="mt-2"
                onSubmit={e => {
                    e.preventDefault();
                    createPerson({variables: {name: name, description: description}});
                    setName('');
                    setDescription('');
                }}
            >
                <div className="mb-2">
                    <label className="mb-1 text-xs tracking-wide text-gray-600 w-12">
                        名前:
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="text-sm p-2 rounded-2xl border border-gray-400 bg-gray-50 w-full shrink focus:outline-none focus:border-blue-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="mb-1 text-xs tracking-wide text-gray-600 w-12">
                        説明:
                    </label>
                    <textarea
                        name="description"
                        className="text-sm p-2 rounded-2xl border border-gray-400 bg-gray-50 w-full shrink focus:outline-none focus:border-blue-400"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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

PersonCreateForm.propTypes = {
    personsGql: PropTypes.object
}

export default PersonCreateForm;