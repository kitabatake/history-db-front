import {gql, useMutation} from "@apollo/client";
import {ReactElement, useState} from "react";
import PropTypes from 'prop-types'
import {apolloClient} from "../apolloClient";
import AsyncSelect from "react-select/async";

type Option = {label: string, value: number}

const createPersonRelationQuery = gql`
mutation CreatePersonRelation($description: String!, $person_ids: [Int!]) {
    createPersonRelation(description: $description, person_ids: $person_ids) {
        id,
        description
    }
} 
`;

const searchPersonsQuery = gql`
query SearchPersons($nameForSearch: String!) {
    persons(nameForSearch: $nameForSearch) {
        id,
        name
    }
} 
`;

function loadPersonOptions(input, callback) {
    if (!input) {
        return Promise.resolve({options: []});
    }

    return apolloClient.query({
        query: searchPersonsQuery,
        variables: {nameForSearch: input}
    }).then((response) => {
        callback(response.data.persons.map(person => {
            return {
                value: person.id,
                label: person.name
            };
        }))
    });
}

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
                    <AsyncSelect<Option, true>
                        name="person_ids"
                        loadOptions={loadPersonOptions}
                        isMulti
                        onChange={(options: readonly Option[]) => {
                            setPersonIds(options.map(option => option.value))
                        }}
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

PersonRelationCreateForm.propTypes = {
    personRelationsGql: PropTypes.object
}

export default PersonRelationCreateForm;