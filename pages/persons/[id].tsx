import {useRouter} from 'next/router'
import {ReactElement} from "react";
import {useGetPersonWithDetailsQuery} from "../../src/generated/graphql";
import {PersonAliasList} from "../../components/PersonAliasList";
import {Grid, GridItem, HStack, Table, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import PersonNameLink from "../../components/PersonNameLink";

export default function Persons(): ReactElement {
    const router = useRouter()
    const {id} = router.query;
    const {data} = useGetPersonWithDetailsQuery({variables: {id: Number(id)}});
    return (
        <>
            {data && (
                <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                    <GridItem bg='white' rounded="base" boxShadow="md">
                        <Table size='sm'>
                            {/*<colgroup>*/}
                            {/*    <col width='12px' />*/}
                            {/*    <col className="w-fit" />*/}
                            {/*</colgroup>*/}
                            <Tbody>
                            <Tr>
                                <Th>ID</Th>
                                <Td>{data.person.id}</Td>
                            </Tr>
                            <Tr>
                                <Th>名前</Th>
                                <Td>{data.person.name}</Td>
                            </Tr>
                            <Tr>
                                <Th>別名</Th>
                                <Td>
                                    <PersonAliasList personId={Number(id)} />
                                </Td>
                            </Tr>
                            <Tr>
                                <Th>説明</Th>
                                <Td>{data.person.description}</Td>
                            </Tr>
                            </Tbody>
                        </Table>
                    </GridItem>
                    <GridItem p={5} bg='white' rounded="base" boxShadow="md">
                        <Text>
                            関連
                        </Text>
                        <Table mt={3} size='sm'>
                            <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>説明</Th>
                                <Th>人物</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            {data.person.relations.map((personRelation) => (
                                <Tr key={personRelation.id}>
                                    <Td>{personRelation.id}</Td>
                                    <Td>{personRelation.description}</Td>
                                    <Td>
                                        <HStack spacing={2}>
                                            {personRelation.persons.map((person) => {
                                                return (
                                                    <PersonNameLink key={person.id} id={person.id} name={person.name} />
                                                )
                                            })}
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                            </Tbody>
                        </Table>
                    </GridItem>
                    <GridItem p={5} bg='white' rounded="base" boxShadow="md">
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
                            {data.person.activities.map((activity) => (
                                <Tr key={activity.id}>
                                    <Td>{activity.id}</Td>
                                    <Td>{activity.description}</Td>
                                    <Td>
                                        <HStack spacing={2}>
                                            {activity.persons.map((person) => {
                                                return (
                                                    <PersonNameLink key={person.id} id={person.id} name={person.name} />
                                                )
                                            })}
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                            </Tbody>
                        </Table>
                    </GridItem>
                </Grid>
            )}
        </>
    )
}