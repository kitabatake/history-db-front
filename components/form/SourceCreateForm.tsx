import {ReactElement} from "react";
import SourceForm, {SourceFormData} from "./SourceForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useCreateSourceMutation} from "../../src/generated/graphql";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[]
}

export default function SourceCreateForm({refetchQueriesOnCreate} : Props): ReactElement {
    const [createSource] = useCreateSourceMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
        <SourceForm
            defaultData={{name: ""}}
            onSubmit={(data: SourceFormData) => {
                createSource({variables: {name: data.name}});
            }}
        />
    )
}