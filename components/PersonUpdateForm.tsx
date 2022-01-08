import {gql, useMutation, useQuery} from "@apollo/client";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {Person} from "../types";
import PersonForm, {PersonFormData} from "./PersonForm";

const updatePersonGql = gql`
mutation UpdatePerson($id: Int!, $name: String!, $description: String!) {
    updatePerson(id: $id, name: $name, description: $description) {
        id
    }
} 
`;

const getPersonGql = gql`
query getPerson($id: Int!) {
    person(id: $id) {
        id,
        name,
        description
    }
} 
`;

interface Props {
    personId: number,
    refetchQueries: RefetchQueryDescriptor[],
    onSubmit: () => void
}

export function PersonUpdateForm({personId, refetchQueries, onSubmit}: Props) {
    const {data} = useQuery<{ person: Person }>(getPersonGql, {variables: {id: personId}});
    const [updatePerson] = useMutation(updatePersonGql, {
        refetchQueries: [
            {
                query: getPersonGql,
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