import {ReactElement} from "react";
import SourceCreateForm from "../components/form/SourceCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import SourceList from "../components/SourceList";
import {GET_SOURCES_QUERY} from "../graphqls/sources";
import {Box, Flex, Text} from "@chakra-ui/react";

export default function Sources(): ReactElement {
    return (
        <Flex>
            <Box w='300px' mr={4}  bg='white' rounded="base" boxShadow="md" p={4}>
                <Text mb='4'>出典登録</Text>
                <SourceCreateForm refetchQueriesOnCreate={[GET_SOURCES_QUERY]}/>
            </Box>
            <Box flex='1' bg='white' rounded="base" boxShadow="md">
                <SourceList />
            </Box>
        </Flex>
    )
}
