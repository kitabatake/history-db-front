import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import ActivityForm, {ActivityFormData} from "./ActivityForm";
import {useGetActivityQuery, useUpdateActivityMutation} from "../../src/generated/graphql";
import {GET_ACTIVITY_QUERY} from "../../graphqls/activities";

interface Props {
    activityId: number,
    refetchQueriesOnUpdate: RefetchQueryDescriptor[],
    onSubmit: () => void
}

export default function ActivityUpdateForm({
                                               activityId,
                                               refetchQueriesOnUpdate,
                                               onSubmit
                                           }: Props) {
    const {data} = useGetActivityQuery({variables: {id: activityId}});
    const [updateActivity] = useUpdateActivityMutation({
        refetchQueries: [
            {
                query: GET_ACTIVITY_QUERY,
                variables: {id: activityId}
            },
            ...refetchQueriesOnUpdate
        ]
    });
    return (
        <>
            {data && (
                <ActivityForm
                    defaultData={{
                        description: data.activity.description,
                        year: data.activity.year,
                        month: data.activity.month,
                        day: data.activity.day,
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
                                year: data.year,
                                month: data.month,
                                day: data.day,
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