import {useRouter} from 'next/router'
import {ReactElement, useState} from "react";
import {
    GetPersonWithDetailsQuery,
    RelationshipDirection,
    useGetPersonWithDetailsQuery,
    useRemoveRelatedPersonMutation
} from "../../src/generated/graphql";
import {GET_PERSON_WITH_DETAILS_QUERY} from "../../graphqls/persons";
import {PersonAliasList} from "../../components/PersonAliasList";
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
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
import {FiArrowLeft, FiArrowRight, FiX} from "react-icons/fi";
import RelatedPersonCreateForm from "../../components/form/RelatedPersonCreateForm";
import AddPersonActivityRelationshipForm from "../../components/form/AddPersonActivityRelationshipForm";
import Graph from "../../components/Graph";

const PersonInfo = ({person}: { person: GetPersonWithDetailsQuery['person'] }): ReactElement => {
    const [personIdForUpdate, setPersonIdForUpdate] = useState<number|null>(null);
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

const RelatedPersons = ({person}:  GetPersonWithDetailsQuery): ReactElement => {
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
                        <Th>向き</Th>
                        <Th>人物</Th>
                        <Th>ラベル</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {person.relatedPersons.map((relatedPerson) => (
                        <Tr key={relatedPerson.id}>
                            <Td>{relatedPerson.id}</Td>
                            <Td>
                                {relatedPerson.direction == RelationshipDirection.Inward && <FiArrowLeft />}
                                {relatedPerson.direction == RelationshipDirection.Outward && <FiArrowRight />}
                            </Td>
                            <Td>
                                <PersonNameLink
                                    key={relatedPerson.person.id}
                                    id={relatedPerson.person.id}
                                    name={relatedPerson.person.name}/>
                            </Td>
                            <Td>{relatedPerson.label}</Td>
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

const Activities = ({person}: GetPersonWithDetailsQuery): ReactElement => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Text>アクティビティ</Text>
            <Table mt={3} size='sm'>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>ラベル</Th>
                        <Th>アクティビティ</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {person.relatedActivities.map((relatedActivity) => (
                        <Tr key={relatedActivity.id}>
                            <Td>{relatedActivity.id}</Td>
                            <Td>{relatedActivity.label}</Td>
                            <Td>{relatedActivity.activity.name}</Td>
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
                        <AddPersonActivityRelationshipForm
                            refetchQueries={[GET_PERSON_WITH_DETAILS_QUERY]}
                            personId={person.id}
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

export default function Person(): ReactElement {
    const router = useRouter()
    const {id} = router.query;
    const {data} = useGetPersonWithDetailsQuery({variables: {id: Number(id)}});
    const elements = {
        nodes:[
            //グラフの点、ノードのidが必須で、他の属性は機能によって調整するばよい
            {data: {id: '172', name: 'Tom Cruise', label: 'Person'}},
            {data: {id: '183', name: 'POPO', label: 'Person'}},
        ],
        edges:[
            //グラフの線、エッジはsource(開始点id)とtarget(終了点id)は必須で、他の属性も追加可能
            {data: {source: '172', target: '183', relationship: 'Acted_In'}}
        ],
    }

    return (
        <>
            {data && (
                <>
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
                    <Box mt={10} w="100%" h="60vh">
                        <Graph targetNodeId={data.person.id} />
                    </Box>
                </>
            )}
        </>
    )
}