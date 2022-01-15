import {ReactElement} from "react";
import SourceForm, {SourceFormData} from "./SourceForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useGetSourceQuery, useUpdateSourceMutation} from "../src/generated/graphql";

interface Props {
    sourceId: number,
    refetchQueries: RefetchQueryDescriptor[],
    onSubmit: () => void
}

export default function SourceUpdateForm({sourceId, refetchQueries, onSubmit}: Props): ReactElement {
    const [updateSource] = useUpdateSourceMutation({
        refetchQueries: refetchQueries
    });
    const {data} = useGetSourceQuery({variables: {id: sourceId}});

    return (
        <>
            <div className="font-medium text-center text-lg text-gold-800">
                出典編集
            </div>
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