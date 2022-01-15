import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import PersonForm, {PersonFormData} from "./PersonForm";
import {useGetPersonQuery, useUpdatePersonMutation} from "../src/generated/graphql";
import {GET_PERSON_QUERY} from "../graphqls/persons";

interface Props {
    personId: number,
    refetchQueriesOnUpdate: RefetchQueryDescriptor[],
    onUpdated: () => void
}

export function PersonUpdateForm({personId, refetchQueriesOnUpdate, onUpdated}: Props) {
    const {data} = useGetPersonQuery({variables: {id: personId}});
    const [updatePerson, { error }] = useUpdatePersonMutation({
        refetchQueries: [
            {
                query: GET_PERSON_QUERY,
                variables: {id: personId}
            },
            ...refetchQueriesOnUpdate
        ],
        onCompleted: () => onUpdated(),
        onError: () => {}
    });
    return (
        <>
            <div className="font-medium text-center text-lg text-gold-800">
                人物編集
            </div>
            {data && (
                <>
                    {error && (
                        <div className="my-1 text-red-500 bg-red-100 p-2 text-sm rounded-lg border border-red-200">
                            {error.message}
                        </div>
                    )}
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
                        }}
                    />
                </>
            )}
        </>
    )
}