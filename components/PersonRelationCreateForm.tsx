import {gql, useMutation} from "@apollo/client";
import {ReactElement} from "react";
import PersonRelationForm from "./PersonRelationForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";

const createPersonRelationQuery = gql`
mutation CreatePersonRelation($description: String!, $personIds: [Int!]) {
    createPersonRelation(description: $description, personIds: $personIds) {
        id,
        description
    }
} 
`;

interface Props {
    refetchQueries: RefetchQueryDescriptor[]
}

export default function PersonRelationCreateForm({refetchQueries}: Props): ReactElement {
    const [createPersonRelation] = useMutation(createPersonRelationQuery, {
        refetchQueries: refetchQueries
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
                            personIds: data.persons.map(person => person.value)
                        }
                    });
                }}
            />
        </div>
    )
}