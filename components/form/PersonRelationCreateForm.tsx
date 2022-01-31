import {ReactElement} from "react";
import PersonRelationForm from "./PersonRelationForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useCreatePersonRelationMutation} from "../../src/generated/graphql";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[]
    defaultData?: {
        description: string,
        persons: Array<{value: number, label: string}>,
    }
    onSubmit?: () => void
}

export default function PersonRelationCreateForm({refetchQueriesOnCreate, onSubmit, defaultData}: Props): ReactElement {
    const [createPersonRelation] = useCreatePersonRelationMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
        <PersonRelationForm
            defaultData={defaultData}
            onSubmit={(data) => {
                createPersonRelation({
                    variables: {
                        description: data.description,
                        personIds: data.persons.map(person => person.value)
                    }
                });
                if (onSubmit) {
                    onSubmit()
                }
            }}
        />
    )
}