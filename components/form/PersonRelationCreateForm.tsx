import {ReactElement} from "react";
import PersonRelationForm from "./PersonRelationForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useCreatePersonRelationMutation} from "../../src/generated/graphql";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[]
}

export default function PersonRelationCreateForm({refetchQueriesOnCreate}: Props): ReactElement {
    const [createPersonRelation] = useCreatePersonRelationMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
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
    )
}