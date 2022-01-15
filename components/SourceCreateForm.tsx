import {ReactElement} from "react";
import SourceForm, {SourceFormData} from "./SourceForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useCreateSourceMutation} from "../src/generated/graphql";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[]
}

export default function SourceCreateForm({refetchQueriesOnCreate} : Props): ReactElement {
    const [createSource] = useCreateSourceMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
        <div className="flex flex-col bg-white shadow-md px-8 py-6 rounded-lg">
            <div className="font-medium self-center text-lg text-gold-800">
                出典登録
            </div>
            <SourceForm
                defaultData={{name: ""}}
                onSubmit={(data: SourceFormData) => {
                    createSource({variables: {name: data.name}});
                }}
            />
        </div>
    )
}