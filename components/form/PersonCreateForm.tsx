import {ReactElement} from "react";
import PersonForm, {PersonFormData} from "./PersonForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useCreatePersonMutation} from "../../src/generated/graphql";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[]
}

export default function PersonCreateForm({refetchQueriesOnCreate}: Props): ReactElement {
    const [createPerson,  { error }] = useCreatePersonMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
        <div className="flex flex-col bg-white shadow-md px-8 py-6 rounded-lg">
            <div className="font-medium text-xl text-gold-800">
                人物登録
            </div>
            {error && (
                <div className="my-1 text-red-500 bg-red-100 p-2 text-sm rounded-lg border border-red-200">
                    {error.message}
                </div>
            )}
            <PersonForm
                onSubmit={(data: PersonFormData) => {
                    createPerson({variables: {name: data.name, description: data.description}});
                }}
            />
        </div>
    )
}