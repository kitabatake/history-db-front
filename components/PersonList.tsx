import {ReactElement, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import Link from "next/link";
import {PersonUpdateForm} from "./form/PersonUpdateForm";
import {useDeletePersonMutation, useGetPersonsQuery} from "../src/generated/graphql";
import {GET_PERSONS_QUERY} from "../graphqls/persons";

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

export default function PersonList(): ReactElement {
    const {loading, error, data} = useGetPersonsQuery();
    const [personIdForUpdate, setPersonIdForUpdate] = useState(null);
    const [deletePersonMutation] = useDeletePersonMutation({
        refetchQueries: [GET_PERSONS_QUERY]
    });
    const deletePerson = (person) => {
        confirmAlert({
            message: `人物「${person.name}」を本当に削除しますか？`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deletePersonMutation({variables: {id: person.id}})
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
                        <Th className="p-2">名前</Th>
                        <Th className="p-2">説明</Th>
                        <Th></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {data.persons.map((person) => (
                        <Tr key={person.id}>
                            <Td>{person.id}</Td>
                            <Td>
                                <Link href={`/persons/${person.id}`}>
                                    <a>{person.name}</a>
                                </Link>
                            </Td>
                            <Td>{person.description}</Td>
                            <Td>
                                <Stack spacing={1} direction='row'>
                                    <Button colorScheme='gold' size='xs' onClick={() => setPersonIdForUpdate(person.id)}>
                                        編集
                                    </Button>
                                    <Button colorScheme='red' size='xs' onClick={() => deletePerson(person)}>
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
                isOpen={personIdForUpdate != null}
                onClose={() => setPersonIdForUpdate(null)}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>人物編集</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {personIdForUpdate && (
                            <PersonUpdateForm
                                personId={personIdForUpdate}
                                refetchQueriesOnUpdate={[GET_PERSONS_QUERY]}
                                onUpdated={() => setPersonIdForUpdate(null)}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}