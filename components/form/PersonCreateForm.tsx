import {ReactElement} from "react";
import PersonForm, {PersonFormData} from "./PersonForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useCreatePersonMutation} from "../../src/generated/graphql";
import {ErrorText} from "../chakuraUiExtends";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[]
}

export default function PersonCreateForm({refetchQueriesOnCreate}: Props): ReactElement {
    const [createPerson,  { error }] = useCreatePersonMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
        <>
            {error && (
                <ErrorText>
                    {error.message}
                </ErrorText>
            )}
            <PersonForm
                onSubmit={(data: PersonFormData) => {
                    createPerson({variables: {name: data.name, description: data.description}});
                }}
            />
        </>
    )
}