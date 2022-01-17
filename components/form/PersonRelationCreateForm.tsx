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
        <div className="flex flex-col bg-white shadow-md px-8 py-6 rounded-lg">
            <div className="font-medium self-center text-lg text-gold-800">
                関連登録
            </div>
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
        </div>
    )
}