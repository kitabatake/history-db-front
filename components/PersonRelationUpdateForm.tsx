import {ReactElement} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {DocumentNode} from "graphql";
import PersonRelationForm, {PersonRelationFormData} from "./PersonRelationForm";

const updatePersonRelationQuery = gql`
mutation UpdatePersonRelation($id: Int!, $description: String!, $person_ids: [Int!]) {
    updatePersonRelation(id: $id, description: $description, person_ids: $person_ids) {
        id
    }
} 
`;

const getPersonRelationQuery = gql`
query getPersonRelation($id: Int!) {
    personRelation(id: $id) {
        id,
        description,
        persons {
            id,
            name
        }
    }
} 
`;


interface Props {
    personRelationId: number,
    personRelationsGql: DocumentNode,
    onSubmit: () => void
}

export default function PersonRelationUpdateForm({
                                                     personRelationId,
                                                     personRelationsGql,
                                                     onSubmit
                                                 }: Props): ReactElement {
    const [updatePersonRelation] = useMutation(updatePersonRelationQuery, {
        refetchQueries: [
            personRelationsGql,
            {
                query: getPersonRelationQuery,
                variables: {id: personRelationId}
            }
        ]
    });
    const {data} = useQuery(getPersonRelationQuery, {variables: {id: personRelationId}});
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
                                person_ids: data.persons.map((person: any) => person.value)
                            }
                        });
                        onSubmit();
                    }}
                />
            )}
        </>
    )
}