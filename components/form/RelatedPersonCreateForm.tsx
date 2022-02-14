import {ReactElement} from "react";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useAddRelatedPersonMutation} from "../../src/generated/graphql";
import RelatedPersonForm from "./RelatedPersonForm";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[],
    onSubmit?: () => void,
    from?: {value: number, label: string}
}

export default function RelatedPersonCreateForm({refetchQueriesOnCreate, onSubmit, from}: Props): ReactElement {
    const [addRelatedPersonMutation] = useAddRelatedPersonMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
        <RelatedPersonForm
            defaultData={from
                ? {label: "", from: from, to: null}
                : {label: "", from: null, to: null}
            }
            onSubmit={(data) => {
                addRelatedPersonMutation({
                    variables: {
                        fromId: data.from.value,
                        toId: data.to.value,
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