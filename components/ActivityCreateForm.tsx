import {gql, useMutation} from "@apollo/client";
import {ReactElement} from "react";
import ActivityForm from "./ActivityForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";

const createActivityQuery = gql`
mutation CreateActivity($description: String!, $source_id: Int, $person_ids: [Int!]) {
    createActivity(description: $description, source_id: $source_id, person_ids: $person_ids) {
        id,
        description
    }
} 
`;

interface Props {
    refetchQueries: RefetchQueryDescriptor[]
}

export default function ActivityCreateForm({refetchQueries}: Props): ReactElement {
    const [createActivity] = useMutation(createActivityQuery, {
        refetchQueries: refetchQueries
    });

    return (
        <div className="flex flex-col bg-white shadow-md px-8 py-6 rounded-lg">
            <div className="font-medium text-xl text-gold-800">
                アクティビティ登録
            </div>
            <ActivityForm
                onSubmit={(data) => {
                    createActivity({
                        variables: {
                            description: data.description,
                            person_ids: data.persons.map(person => person.value),
                            source_id: data.sourceId
                        }
                    });
                }}
            />
        </div>
    )
}