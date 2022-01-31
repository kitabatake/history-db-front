import {ReactElement} from "react";
import PersonRelationCreateForm from "../components/form/PersonRelationCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import PersonRelationList from "../components/PersonRelationList";
import {GET_PERSON_RELATIONS_QUERY} from "../graphqls/personRelations";
import {Box, Flex, Text} from "@chakra-ui/react";

export default function PersonRelations(): ReactElement {
    return (
        <Flex>
            <Box w='300px' mr={4}  bg='white' rounded="base" boxShadow="md" p={4}>
                <Text mb={4}>関連登録</Text>
                <PersonRelationCreateForm refetchQueriesOnCreate={[GET_PERSON_RELATIONS_QUERY]}/>
            </Box>
            <Box flex='1' bg='white' rounded="base" boxShadow="md">
                <PersonRelationList />
            </Box>
        </Flex>
    )
}
