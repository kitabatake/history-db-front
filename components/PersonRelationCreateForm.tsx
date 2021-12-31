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

function PersonRelationCreateForm({personRelations_gql: personRelationsGql}): ReactElement {
    const [createPersonRelation] = useMutation(createPersonRelationQuery, {
        refetchQueries: [personRelationsGql]
    });
    const [description, setDescription] = useState("");
    const [personIds, setPersonIds] = useState([]);

    return (
        <div className="mt-5 flex flex-col bg-white shadow-md px-8 py-6 rounded-3xl w-50 max-w-md">
            <div className="font-medium self-center text-xl text-gray-800">
                関連登録
            </div>
            <form
                className="mt-2"
                onSubmit={e => {
                    e.preventDefault();
                    createPersonRelation({variables: {description: description, person_ids: personIds}});
                    setDescription('');
                    setPersonIds([]);
                }}
            >
                <div className="mb-2">
                    <label className="mb-1 text-xs tracking-wide text-gray-600 w-12">
                        概要:
                    </label>
                    <input
                        type="text"
                        name="description"
                        className="text-sm p-2 rounded-2xl border border-gray-400 bg-gray-50 w-full shrink focus:outline-none focus:border-blue-400"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="mb-1 text-xs tracking-wide text-gray-600 w-12">
                        人物:
                    </label>
                    <PersonsSelect onChange={(personIds) => setPersonIds(personIds)} />
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

PersonRelationCreateForm.propTypes = {
    personRelationsGql: PropTypes.object
}

export default PersonRelationCreateForm;