import {useGetPersonWithDetailsQuery} from "../../src/generated/graphql";
import {ReactElement} from "react";
import {Box, Table, Tbody, Td, Th, Tr} from "@chakra-ui/react";
import {PersonAliasList} from "../PersonAliasList";
import PersonNameLink from "../PersonNameLink";

interface Props {
    personId: number;
}
const PersonModal = ({personId}: Props): ReactElement => {
    const {data} = useGetPersonWithDetailsQuery({variables: {id: personId}});
    return (
        <>
            {data && (
                <>
                    <Box>
                        <Table size='sm'>
                            <Tbody>
                                <Tr>
                                    <Th>ID</Th>
                                    <Td>{data.person.id}</Td>
                                </Tr>
                                <Tr>
                                    <Th>名前</Th>
                                    <Td><PersonNameLink id={data.person.id} name={data.person.name} /></Td>
                                </Tr>
                                <Tr>
                                    <Th>別名</Th>
                                    <Td>
                                        <PersonAliasList aliases={data.person.aliases} personId={data.person.id} />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Th>説明</Th>
                                    <Td whiteSpace='pre-wrap'>{data.person.description}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                </>
            )}
        </>
    )
}

export default PersonModal;