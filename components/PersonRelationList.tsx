import {ReactElement, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import Link from "next/link";
import {useDeletePersonRelationMutation, useGetPersonRelationsQuery} from "../src/generated/graphql";
import {GET_PERSON_RELATIONS_QUERY} from "../graphqls/personRelations";

import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import SourceUpdateForm from "./form/SourceUpdateForm";

export default function PersonRelationList(): ReactElement {
    const {loading, error, data} = useGetPersonRelationsQuery();
    const [deletePersonRelationMutation] = useDeletePersonRelationMutation({
        refetchQueries: [GET_PERSON_RELATIONS_QUERY]
    });
    const [personRelationIdForUpdate, setPersonRelationIdForUpdate] = useState(null);
    const deletePersonRelation = (personRelation) => {
        confirmAlert({
            message: `本当に削除しますか？`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deletePersonRelationMutation({variables: {id: personRelation.id}})
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }
    return (
        <>
            {loading && (<Text>loading ...</Text>)}
            {error && (<Text>error ...</Text>)}
            {data && (
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th className="p-2">ID</Th>
                        <Th>説明</Th>
                        <Th>人物</Th>
                        <Th></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {data.personRelations.map((personRelation) => (
                        <Tr key={personRelation.id}>
                            <Td>{personRelation.id}</Td>
                            <Td>{personRelation.description}</Td>
                            <Td>
                                {personRelation.persons && personRelation.persons.map((person) => {
                                    return (
                                        <Link key={person.id} href={`/persons/${person.id}`}>
                                            <a>{person.name}</a>
                                        </Link>
                                    )
                                })}
                            </Td>
                            <Td className="space-x-1">
                                <Stack spacing={1} direction='row'>
                                    <Button colorScheme='gold' size='xs' onClick={() => setPersonRelationIdForUpdate(personRelation.id)}>
                                        編集
                                    </Button>
                                    <Button colorScheme='red' size='xs' onClick={() => deletePersonRelation(personRelation)}>
                                        削除
                                    </Button>
                                </Stack>
                            </Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
            )}
            <Modal
                isOpen={personRelationIdForUpdate != null}
                onClose={() => setPersonRelationIdForUpdate(null)}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>出典編集</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {personRelationIdForUpdate && (
                            <SourceUpdateForm
                                sourceId={personRelationIdForUpdate}
                                refetchQueriesOnUpdate={[GET_PERSON_RELATIONS_QUERY]}
                                onSubmit={() => setPersonRelationIdForUpdate(null)}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}