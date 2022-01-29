import {ReactElement, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import SourceUpdateForm from "./form/SourceUpdateForm";
import {useDeleteSourceMutation, useGetSourcesQuery} from "../src/generated/graphql";
import {GET_SOURCES_QUERY} from "../graphqls/sources";

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

export default function SourceList(): ReactElement {
    const {loading, error, data} = useGetSourcesQuery();
    const [sourceIdForUpdate, setSourceIdForUpdate] = useState(null);
    const [deleteSourceMutation] = useDeleteSourceMutation({
        refetchQueries: [GET_SOURCES_QUERY]
    });
    const deleteSource = (source) => {
        confirmAlert({
            message: `出典「${source.name}」を本当に削除しますか？`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteSourceMutation({variables: {id: source.id}})
                },
                {
                    label: 'No',
                    onClick: () => {
                    }
                }
            ]
        });
    }

    return (
        <>
            {loading && (<p>loading ...</p>)}
            {error && (<p>error ...</p>)}
            {data && (
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>名前</Th>
                        <Th></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {data.sources.map((source) => (
                        <Tr key={source.id}>
                            <Td><Text fontSize='sm'>{source.id}</Text></Td>
                            <Td><Text fontSize='sm'>{source.name}</Text></Td>
                            <Td>
                                <Stack spacing={1} direction='row'>
                                    <Button colorScheme='gold' size='xs'  onClick={() => setSourceIdForUpdate(source.id)}>
                                        編集
                                    </Button>
                                    <Button colorScheme='red' size='xs'  onClick={() => deleteSource(source)}>
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
                isOpen={sourceIdForUpdate != null}
                onClose={() => setSourceIdForUpdate(null)}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>出典編集</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {sourceIdForUpdate && (
                            <SourceUpdateForm
                                sourceId={sourceIdForUpdate}
                                refetchQueriesOnUpdate={[GET_SOURCES_QUERY]}
                                onSubmit={() => setSourceIdForUpdate(null)}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}