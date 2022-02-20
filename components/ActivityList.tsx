import {ReactElement, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import ActivityUpdateForm from "./form/ActivityUpdateForm";
import {Activity, useDeleteActivityMutation, useGetActivitiesQuery} from "../src/generated/graphql";
import {GET_ACTIVITIES_QUERY} from "../graphqls/activities";

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

export default function ActivityList(): ReactElement {
    const {loading, error, data} = useGetActivitiesQuery();
    const [activityIdForUpdate, setActivityIdForUpdate] = useState<number|null>(null);
    const [deleteActivityMutation] = useDeleteActivityMutation({
        refetchQueries: [GET_ACTIVITIES_QUERY]
    });
    const deleteActivity = (activity: Activity) => {
        confirmAlert({
            message: `本当に削除しますか？`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteActivityMutation({variables: {id: activity.id}})
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
            {loading && (<Text>loading ...</Text>)}
            {error && (<Text>error ...</Text>)}
            {data && (
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th className="p-2">ID</Th>
                            <Th>説明</Th>
                            <Th>人物</Th>
                            <Th>日時</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {data.activities.map((activity) => (
                        <Tr key={activity.id}>
                            <Td className="p-2 font-medium text-gray-800">{activity.id}</Td>
                            <Td className="p-2 font-medium text-gray-800">{activity.description}</Td>
                            <Td>
                                <Stack spacing={1} direction='row'>
                                    <Button colorScheme='gold' size='xs'  onClick={() => setActivityIdForUpdate(activity.id)}>
                                        編集
                                    </Button>
                                    <Button colorScheme='red' size='xs'  onClick={() => deleteActivity(activity)}>
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
                isOpen={activityIdForUpdate != null}
                onClose={() => setActivityIdForUpdate(null)}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>出典編集</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {activityIdForUpdate && (
                            <ActivityUpdateForm
                                activityId={activityIdForUpdate}
                                refetchQueriesOnUpdate={[GET_ACTIVITIES_QUERY]}
                                onSubmit={() => setActivityIdForUpdate(null)}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}