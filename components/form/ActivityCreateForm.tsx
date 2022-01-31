import {ReactElement} from "react";
import ActivityForm, {ActivityFormData} from "./ActivityForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useCreateActivityMutation} from "../../src/generated/graphql";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[]
}

export default function ActivityCreateForm({refetchQueriesOnCreate}: Props): ReactElement {
    const [createActivity] = useCreateActivityMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
        <ActivityForm
            onSubmit={(data: ActivityFormData) => {
                createActivity({
                    variables: {
                        description: data.description,
                        year: data.year,
                        month: data.month,
                        day: data.day,
                        personIds: data.persons.map(person => person.value),
                        sourceId: data.source ? data.source.value : null
                    }
                });
            }}
        />
    )
}