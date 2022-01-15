import {ReactElement} from "react";
import ActivityForm, {ActivityFormData} from "./ActivityForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useCreateActivityMutation} from "../src/generated/graphql";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[]
}

export default function ActivityCreateForm({refetchQueriesOnCreate}: Props): ReactElement {
    const [createActivity] = useCreateActivityMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
        <div className="flex flex-col bg-white shadow-md px-8 py-6 rounded-lg">
            <div className="font-medium text-xl text-gold-800">
                アクティビティ登録
            </div>
            <ActivityForm
                onSubmit={(data: ActivityFormData) => {
                    createActivity({
                        variables: {
                            description: data.description,
                            year: data.year,
                            month: data.month,
                            day: data.day,
                            personIds: data.persons.map(person => person.value),
                            sourceId:  data.source ? data.source.value : null
                        }
                    });
                }}
            />
        </div>
    )
}