import {ReactElement} from "react";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useAddRelatedPersonMutation} from "../../src/generated/graphql";
import RelatedPersonForm from "./RelatedPersonForm";
import {SelectOption} from "../../lib/types/form";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[],
    onSubmit?: () => void,
    from?: SelectOption
}

export default function RelatedPersonCreateForm({refetchQueriesOnCreate, onSubmit, from = undefined}: Props): ReactElement {
    const [addRelatedPersonMutation] = useAddRelatedPersonMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
        <RelatedPersonForm
            defaultData={{label: "", from: from, to: undefined}}
            onSubmit={(data) => {
                addRelatedPersonMutation({
                    variables: {
                        fromId: data.from!.value,
                        toId: data.to!.value,
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