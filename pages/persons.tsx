import PersonCreateForm from "../components/form/PersonCreateForm";
import {ReactElement} from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';
import PersonList from "../components/PersonList";
import {GET_PERSONS_QUERY} from "../graphqls/persons";
import {Box, Flex, Text} from "@chakra-ui/react";

export default function Persons(): ReactElement {
    return (
        <Flex>
            <Box w='300px' mr={4}  bg='white' rounded="base" boxShadow="md" p={4}>
                <Text mb={4}>人物登録</Text>
                <PersonCreateForm refetchQueriesOnCreate={[GET_PERSONS_QUERY]}/>
            </Box>
            <Box flex='1' bg='white' rounded="base" boxShadow="md">
                <PersonList />
            </Box>
        </Flex>)
}
