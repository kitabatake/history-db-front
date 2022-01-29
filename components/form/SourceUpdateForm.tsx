import {ReactElement} from "react";
import SourceForm, {SourceFormData} from "./SourceForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useGetSourceQuery, useUpdateSourceMutation} from "../../src/generated/graphql";

interface Props {
    sourceId: number,
    refetchQueriesOnUpdate: RefetchQueryDescriptor[],
    onSubmit: () => void
}

export default function SourceUpdateForm({sourceId, refetchQueriesOnUpdate, onSubmit}: Props): ReactElement {
    const [updateSource] = useUpdateSourceMutation({
        refetchQueries: refetchQueriesOnUpdate
    });
    const {data} = useGetSourceQuery({variables: {id: sourceId}});

    return (
        <>
            {data && (
                <SourceForm
                    defaultData={{name: data.source.name}}
                    onSubmit={(data: SourceFormData) => {
                        updateSource({variables: {id: sourceId, name: data.name}});
                        onSubmit();
                    }}
                />
            )}
        </>
    )
}