import {ReactElement} from "react";
import PersonRelationForm, {PersonRelationFormData} from "./PersonRelationForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useGetPersonRelationQuery, useUpdatePersonRelationMutation} from "../../src/generated/graphql";
import {GET_PERSON_RELATION_QUERY} from "../../graphqls/personRelations";

interface Props {
    personRelationId: number,
    refetchQueriesOnUpdate: RefetchQueryDescriptor[],
    onSubmit: () => void
}

export default function PersonRelationUpdateForm({
                                                     personRelationId,
                                                     refetchQueriesOnUpdate,
                                                     onSubmit
                                                 }: Props): ReactElement {
    const [updatePersonRelation] = useUpdatePersonRelationMutation({
        refetchQueries: [
            {
                query: GET_PERSON_RELATION_QUERY,
                variables: {id: personRelationId}
            },
            ...refetchQueriesOnUpdate
        ]
    });
    const {data} = useGetPersonRelationQuery({variables: {id: personRelationId}});
    return (
        <>
            <div className="font-medium text-center text-lg text-gold-800">
                出典編集
            </div>
            {data && (
                <PersonRelationForm
                    defaultData={{
                        description: data.personRelation.description,
                        persons: data.personRelation.persons.map(person => {
                            return {
                                value: person.id,
                                label: person.name
                            }
                        })
                    }}
                    onSubmit={(data: PersonRelationFormData) => {
                        updatePersonRelation({
                            variables: {
                                id: personRelationId,
                                description: data.description,
                                personIds: data.persons.map((person: any) => person.value)
                            }
                        });
                        onSubmit();
                    }}
                />
            )}
        </>
    )
}