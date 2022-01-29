import {ReactElement} from "react";
import SourceCreateForm from "../components/form/SourceCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import SourceList from "../components/SourceList";
import {GET_SOURCES_QUERY} from "../graphqls/sources";
import {Box, Flex} from "@chakra-ui/react";

export default function Sources(): ReactElement {
    return (
        <Flex>
            <Box w='300px' mr={4}>
                <SourceCreateForm refetchQueriesOnCreate={[GET_SOURCES_QUERY]}/>
            </Box>
            <Box flex='1' bg='white' rounded="base" boxShadow="md">
                <SourceList />
            </Box>
        </Flex>
    )
}
