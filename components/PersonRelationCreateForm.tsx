import {gql, useMutation} from "@apollo/client";
import {ReactElement, useState} from "react";
import PropTypes from 'prop-types'
import PersonsSelect from "./PersonsSelect";

const createPersonRelationQuery = gql`
mutation CreatePersonRelation($description: String!, $person_ids: [Int!]) {
    createPersonRelation(description: $description, person_ids: $person_ids) {
        id,
        description
    }
} 
`;

function PersonRelationCreateForm({personRelationsGql: personRelationsGql}): ReactElement {
    const [createPersonRelation] = useMutation(createPersonRelationQuery, {
        refetchQueries: [personRelationsGql]
    });
    const [description, setDescription] = useState("");
    const [selectedPersons, setSelectedPersons] = useState([]);
    return (
        <div className="flex flex-col bg-white shadow-md px-8 py-6 rounded-lg">
            <div className="font-medium self-center text-xl text-gold-800">
                関連登録
            </div>
            <form
                className="mt-2"
                onSubmit={e => {
                    e.preventDefault();
                    createPersonRelation({variables: {description: description, person_ids: selectedPersons.map(option => option.value)}});
                    setDescription('');
                    setSelectedPersons([]);
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

PersonRelationCreateForm.propTypes = {
    personRelationsGql: PropTypes.object
}

export default PersonRelationCreateForm;