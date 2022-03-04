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
    Collapse,
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
import {FiArrowLeft, FiArrowRight, FiChevronDown, FiChevronUp, FiX} from "react-icons/fi";
import RelatedPersonCreateForm from "../../components/form/RelatedPersonCreateForm";
import AddPersonActivityRelationshipForm from "../../components/form/AddPersonActivityRelationshipForm";
import Graph from "../../components/Graph";
import {GET_GRAPH_QUERY} from "../../graphqls/graph";

const PersonInfo = ({person}: { person: GetPersonWithDetailsQuery['person'] }): ReactElement => {
    const [personIdForUpdate, setPersonIdForUpdate] = useState<number|null>(null);
    const { isOpen, onToggle } = useDisclosure({defaultIsOpen: true})
    return (
        <Box bg='white' rounded="base" boxShadow="md">
            <Flex p={4}>
                <Text>基本情報</Text>
                <Spacer />
                <IconButton
                    size="sm"
                    aria-label="open"
                    variant="outline"
                    icon={isOpen ? <FiChevronUp /> : <FiChevronDown /> }
                    onClick={() => onToggle()}
                />
            </Flex>
            <Collapse in={isOpen}>
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
            </Collapse>
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
        </Box>
    )
}

const RelatedPersons = ({person}:  GetPersonWithDetailsQuery): ReactElement => {
    const [removeRelatedPersonMutation] = useRemoveRelatedPersonMutation({
        refetchQueries: [GET_PERSON_WITH_DETAILS_QUERY]
    });
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
    const { isOpen, onToggle} = useDisclosure()
    return (
        <Box p={4} bg='white' rounded="base" boxShadow="md">
            <Flex>
                <Text>関連</Text>
                <Spacer />
                <IconButton
                    size="sm"
                    aria-label="open"
                    variant="outline"
                    icon={isOpen ? <FiChevronUp /> : <FiChevronDown /> }
                    onClick={() => onToggle()}
                />
            </Flex>
            <Collapse in={isOpen}>
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
                            <Tr key={`${person.id}:${relatedPerson.id}`}>
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
                <Flex>
                    <Spacer/>
                    <Button size='xs' colorScheme='gold' onClick={onOpenModal}>追加</Button>
                </Flex>
            </Collapse>
            <Modal
                size='xl'
                isOpen={isOpenModal}
                onClose={onCloseModal}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>関連追加</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <RelatedPersonCreateForm
                            refetchQueriesOnCreate={[GET_PERSON_WITH_DETAILS_QUERY, GET_GRAPH_QUERY]}
                            from={{value: person.id, label: person.name}}
                            onSubmit={onCloseModal}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

const Activities = ({person}: GetPersonWithDetailsQuery): ReactElement => {
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
    const { isOpen, onToggle} = useDisclosure()
    return (
        <Box p={4} bg='white' rounded="base" boxShadow="md">
            <Flex>
                <Text>アクティビティ</Text>
                <Spacer />
                <IconButton
                    size="sm"
                    aria-label="open"
                    variant="outline"
                    icon={isOpen ? <FiChevronUp /> : <FiChevronDown /> }
                    onClick={() => onToggle()}
                />
            </Flex>
            <Collapse in={isOpen}>
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
                <Flex>
                    <Spacer/>
                    <Button size='xs' colorScheme='gold' onClick={onOpenModal}>追加</Button>
                </Flex>
            </Collapse>
            <Modal
                size='xl'
                isOpen={isOpenModal}
                onClose={onCloseModal}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>アクティビティ追加</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <AddPersonActivityRelationshipForm
                            refetchQueries={[GET_PERSON_WITH_DETAILS_QUERY, GET_GRAPH_QUERY]}
                            personId={person.id}
                            onSubmit={onCloseModal}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default function Person(): ReactElement {
    const router = useRouter()
    const {id} = router.query;
    const {data} = useGetPersonWithDetailsQuery({variables: {id: Number(id)}});

    return (
        <Box position="relative">
            {data && (
                <>
                    <Box position="absolute" w="100%" zIndex={10}>
                        <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                            <GridItem>
                                <PersonInfo person={data.person} />
                            </GridItem>
                            <GridItem>
                                <RelatedPersons person={data.person} />
                            </GridItem>
                            <GridItem>
                                <Activities person={data.person} />
                            </GridItem>
                        </Grid>
                    </Box>
                    <Box pt="12vh" w="100%" h="92vh">
                        <Graph targetNodeId={data.person.id} />
                    </Box>
                </>
            )}
        </Box>
    )
}