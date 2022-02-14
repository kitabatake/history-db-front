import {ReactElement} from "react";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useAddRelatedPersonMutation} from "../../src/generated/graphql";
import RelatedPersonForm from "./RelatedPersonForm";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[],
    onSubmit?: () => void
}

export default function PersonRelationCreateForm({refetchQueriesOnCreate, onSubmit}: Props): ReactElement {
    const [addRelatedPersonMutation] = useAddRelatedPersonMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
        <RelatedPersonForm
            onSubmit={(data) => {
                addRelatedPersonMutation({
                    variables: {
                        fromId: data.fromId,
                        toId: data.toId,
                        label: data.label
                    }
                });
                if (onSubmit) {
                    onSubmit()
                }
            }}
        />
    )
}