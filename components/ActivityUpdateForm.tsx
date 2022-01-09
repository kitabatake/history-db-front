import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Activity} from "../types";
import ActivityForm, {ActivityFormData} from "./ActivityForm";

const updateActivityGql = gql`
mutation UpdateActivity($id: Int!, $description: String!, $sourceId: Int, $personIds: [Int!]) {
    updateActivity(id: $id, description: $description, sourceId: $sourceId, personIds: $personIds) {
        id
    }
} 
`;

const getActivityGql = gql`
query getActivity($id: Int!) {
    activity(id: $id) {
        id,
        description,
        persons {
            id,
            name
        },
        source {
            id,
            name
        }
    }
} 
`;

interface Props {
    activityId: number,
    refetchQueries: RefetchQueryDescriptor[],
    onSubmit: () => void
}

export default function ActivityUpdateForm({
                                               activityId,
                                               refetchQueries,
                                               onSubmit
                                           }: Props) {
    const {data} = useQuery<{ activity: Activity }>(getActivityGql, {variables: {id: activityId}});
    const [updateActivity] = useMutation(updateActivityGql, {
        refetchQueries: [
            {
                query: getActivityGql,
                variables: {id: activityId}
            },
            ...refetchQueries
        ]
    });
    return (
        <>
            <div className="font-medium text-center text-lg text-gold-800">
                アクティビティ編集
            </div>
            {data && (
                <ActivityForm
                    defaultData={{
                        description: data.activity.description,
                        source: data.activity.source ?
                            {
                                value: data.activity.source.id,
                                label: data.activity.source.name
                            }
                            : null,
                        persons: data.activity.persons.map(person => {
                            return {
                                value: person.id,
                                label: person.name
                            }
                        })
                    }}
                    onSubmit={(data: ActivityFormData) => {
                        updateActivity({
                            variables: {
                                id: activityId,
                                description: data.description,
                                personIds: data.persons.map((person: any) => person.value),
                                sourceId: data.source ? data.source.value : null
                            }
                        });
                        onSubmit();
                    }}
                />
            )}
        </>
    )
}