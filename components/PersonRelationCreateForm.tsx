import {gql, useMutation} from "@apollo/client";
import {ReactElement} from "react";
import {DocumentNode} from "graphql";
import PersonRelationForm, {PersonRelationFormData} from "./PersonRelationForm";

const createPersonRelationQuery = gql`
mutation CreatePersonRelation($description: String!, $person_ids: [Int!]) {
    createPersonRelation(description: $description, person_ids: $person_ids) {
        id,
        description
    }
} 
`;

interface Props {
    personRelationsGql: DocumentNode
}

export default function PersonRelationCreateForm({personRelationsGql}: Props): ReactElement {
    const [createPersonRelation] = useMutation(createPersonRelationQuery, {
        refetchQueries: [personRelationsGql]
    });

    return (
        <div className="flex flex-col bg-white shadow-md px-8 py-6 rounded-lg">
            <div className="font-medium self-center text-lg text-gold-800">
                関連登録
            </div>
            <PersonRelationForm
                onSubmit={(data) => {
                    createPersonRelation({
                        variables: {
                            description: data.description,
                            person_ids: data.persons.map(person => person.value)
                        }
                    });
                }}
            />
        </div>
    )
}