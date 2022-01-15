import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import PersonForm, {PersonFormData} from "./PersonForm";
import {useGetPersonQuery, useUpdatePersonMutation} from "../src/generated/graphql";
import {GET_PERSON_QUERY} from "../graphqls/persons";

interface Props {
    personId: number,
    refetchQueries: RefetchQueryDescriptor[],
    onSubmit: () => void
}

export function PersonUpdateForm({personId, refetchQueries, onSubmit}: Props) {
    const {data} = useGetPersonQuery({variables: {id: personId}});
    const [updatePerson] = useUpdatePersonMutation({
        refetchQueries: [
            {
                query: GET_PERSON_QUERY,
                variables: {id: personId}
            },
            ...refetchQueries
        ]
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