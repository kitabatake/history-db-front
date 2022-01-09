import {gql, useMutation} from "@apollo/client";
import {ReactElement} from "react";
import ActivityForm, {ActivityFormData} from "./ActivityForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";

const createActivityQuery = gql`
mutation CreateActivity($description: String!, $sourceId: Int, $personIds: [Int!]) {
    createActivity(description: $description, sourceId: $sourceId, personIds: $personIds) {
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
                onSubmit={(data: ActivityFormData) => {
                    createActivity({
                        variables: {
                            description: data.description,
                            personIds: data.persons.map(person => person.value),
                            sourceId:  data.source ? data.source.value : null
                        }
                    });
                }}
            />
        </div>
    )
}