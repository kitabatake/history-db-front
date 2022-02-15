import {ReactElement} from "react";
import ActivityForm, {ActivityFormData} from "./ActivityForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useCreateActivityMutation} from "../../src/generated/graphql";
import {SelectOption} from "../../lib/types/form";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[],
    defaultData?: {
        description: string,
        persons: Array<SelectOption>,
    }
    onSubmit?: () => void
}

export default function ActivityCreateForm({refetchQueriesOnCreate, defaultData, onSubmit}: Props): ReactElement {
    const [createActivity] = useCreateActivityMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
        <ActivityForm
            defaultData={defaultData}
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
                if (onSubmit) {
                    onSubmit()
                }
            }}
        />
    )
}