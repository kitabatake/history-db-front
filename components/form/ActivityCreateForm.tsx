import {ReactElement} from "react";
import ActivityForm, {ActivityFormData} from "./ActivityForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useCreateActivityMutation} from "../../src/generated/graphql";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[],
    defaultData?: {
        name: string,
        description: string,
        // persons: Array<SelectOption>,
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
                        name: data.name,
                        description: data.description,
                    }
                });
                if (onSubmit) {
                    onSubmit()
                }
            }}
        />
    )
}