import PersonCreateForm from "../components/form/PersonCreateForm";
import {ReactElement} from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';
import PersonList from "../components/PersonList";
import {GET_PERSONS_QUERY} from "../graphqls/persons";
import {Box, Flex} from "@chakra-ui/react";

export default function Persons(): ReactElement {
    return (
        <Flex>
            <Box w='300px' mr={4}>
                <PersonCreateForm refetchQueriesOnCreate={[GET_PERSONS_QUERY]}/>
            </Box>
            <Box flex='1' bg='white' rounded="base" boxShadow="md">
                <PersonList />
            </Box>
        </Flex>)
}
