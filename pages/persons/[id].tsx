import {useRouter} from 'next/router'
import {ReactElement, useState} from "react";
import {
    GetPersonWithDetailsQueryResult,
    useGetPersonWithDetailsQuery,
    useRemoveRelatedPersonMutation
} from "../../src/generated/graphql";
import {GET_PERSON_WITH_DETAILS_QUERY} from "../../graphqls/persons";
import {PersonAliasList} from "../../components/PersonAliasList";
import {
    Button,
    Flex,
    Grid,
    GridItem,
    HStack,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import PersonNameLink from "../../components/PersonNameLink";
import {PersonUpdateForm} from "../../components/form/PersonUpdateForm";
import ActivityCreateForm from "../../components/form/ActivityCreateForm";
import {FiX} from "react-icons/fi";
import RelatedPersonCreateForm from "../../components/form/RelatedPersonCreateForm";

const PersonInfo = ({person}: { person: GetPersonWithDetailsQueryResult['data']['person'] }): ReactElement => {
    const [personIdForUpdate, setPersonIdForUpdate] = useState(null);
    return (
        <>
            <Table size='sm'>
                <Tbody>
                    <Tr>
                        <Th>ID</Th>
                        <Td>{person.id}</Td>
                    </Tr>
                    <Tr>
                        <Th>名前</Th>
                        <Td>{person.name}</Td>
                    </Tr>
                    <Tr>
                        <Th>別名</Th>
                        <Td>
                            <PersonAliasList aliases={person.aliases} personId={person.id} />
                        </Td>
                    </Tr>
                    <Tr>
                        <Th>説明</Th>
                        <Td whiteSpace='pre-wrap'>{person.description}</Td>
                    </Tr>
                </Tbody>
            </Table>
            <Flex p={4}>
                <Spacer/>
                <Button size='xs' colorScheme='gold' onClick={() => setPersonIdForUpdate(person.id)}>編集</Button>
            </Flex>
            <Modal
                size='xl'
                isOpen={personIdForUpdate != null}
                onClose={() => setPersonIdForUpdate(null)}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>人物編集</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {personIdForUpdate && (
                            <PersonUpdateForm
                                personId={personIdForUpdate}
                                refetchQueriesOnUpdate={[]}
                                onUpdated={() => setPersonIdForUpdate(null)}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

const RelatedPersons = ({person}:  GetPersonWithDetailsQueryResult['data']): ReactElement => {
    const [removeRelatedPersonMutation] = useRemoveRelatedPersonMutation({
        refetchQueries: [GET_PERSON_WITH_DETAILS_QUERY]
    });
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Text>
                関連
            </Text>
            <Table mt={3} size='sm'>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>ラベル</Th>
                        <Th>人物</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {person.relatedPersons.map((relatedPerson) => (
                        <Tr key={relatedPerson.id}>
                            <Td>{relatedPerson.id}</Td>
                            <Td>{relatedPerson.label}</Td>
                            <Td>
                                <PersonNameLink
                                    key={relatedPerson.person.id}
                                    id={relatedPerson.person.id}
                                    name={relatedPerson.person.name}/>
                            </Td>
                            <Td>
                                <IconButton
                                    aria-label='close'
                                    icon={<FiX />}
                                    size='xs'
                                    colorScheme='gold'
                                    ml={2}
                                    onClick={() => {
                                        removeRelatedPersonMutation({
                                            variables: {
                                                id: relatedPerson.id
                                            }
                                        })
                                    }}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Flex p={4}>
                <Spacer/>
                <Button size='xs' colorScheme='gold' onClick={onOpen}>追加</Button>
            </Flex>
            <Modal
                size='xl'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>関連追加</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <RelatedPersonCreateForm
                            refetchQueriesOnCreate={[GET_PERSON_WITH_DETAILS_QUERY]}
                            from={{value: person.id, label: person.name}}
                            onSubmit={onClose}
                            // defaultData={{
                            //     description: '',
                            //     persons: [{value: person.id, label: person.name}]
                            // }}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

const Activities = ({person}:  GetPersonWithDetailsQueryResult['data']): ReactElement => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Text>アクティビティ</Text>
            <Table mt={3} size='sm'>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>説明</Th>
                        <Th>人物</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {person.activities.map((activity) => (
                        <Tr key={activity.id}>
                            <Td>{activity.id}</Td>
                            <Td>{activity.description}</Td>
                            <Td>
                                <HStack spacing={2}>
                                    {activity.persons.map((person) => {
                                        return (
                                            <PersonNameLink key={person.id} id={person.id}
                                                            name={person.name}/>
                                        )
                                    })}
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Flex p={4}>
                <Spacer/>
                <Button size='xs' colorScheme='gold' onClick={onOpen}>追加</Button>
            </Flex>
            <Modal
                size='xl'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>アクティビティ追加</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <ActivityCreateForm
                            refetchQueriesOnCreate={[GET_PERSON_WITH_DETAILS_QUERY]}
                            onSubmit={onClose}
                            defaultData={{
                                description: '',
                                persons: [{value: person.id, label: person.name}]
                            }}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default function Person(): ReactElement {
    const router = useRouter()
    const {id} = router.query;
    const {data} = useGetPersonWithDetailsQuery({variables: {id: Number(id)}});
    return (
        <>
            {data && (
                <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                    <GridItem bg='white' rounded="base" boxShadow="md">
                        <PersonInfo person={data.person} />
                    </GridItem>
                    <GridItem p={5} bg='white' rounded="base" boxShadow="md">
                        <RelatedPersons person={data.person} />
                    </GridItem>
                    <GridItem p={5} bg='white' rounded="base" boxShadow="md">
                        <Activities person={data.person} />
                    </GridItem>
                </Grid>
            )}
        </>
    )
}