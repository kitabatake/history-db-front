import {InternalRefetchQueriesInclude} from "@apollo/client/core/types";
import PersonForm, {PersonFormData} from "./PersonForm";
import {useGetPersonQuery, useUpdatePersonMutation} from "../src/generated/graphql";

interface Props {
    personId: number,
    refetchQueriesOnUpdate: InternalRefetchQueriesInclude,
    onSubmit: () => void
}

export function PersonUpdateForm({personId, refetchQueriesOnUpdate, onSubmit}: Props) {
    const {data} = useGetPersonQuery({variables: {id: personId}});
    const [updatePerson] = useUpdatePersonMutation({
        refetchQueries: refetchQueriesOnUpdate
    });
    return (
        <>
            <div className="font-medium text-center text-lg text-gold-800">
                人物編集
            </div>
            {data && (
                <PersonForm
                    defaultData={{
                        name: data.person.name,
                        description: data.person.description,
                    }}
                    onSubmit={(data: PersonFormData) => {
                        updatePerson({
                            variables: {
                                id: personId,
                                name: data.name,
                                description: data.description,
                            }
                        });
                        onSubmit();
                    }}
                />
            )}
        </>
    )
}