import {ReactElement} from "react";
import ActivityCreateForm from "../components/form/ActivityCreateForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import ActivityList from "../components/ActivityList";
import {GET_ACTIVITIES_QUERY} from "../graphqls/activitie";
import {Box, Flex} from "@chakra-ui/react";

export default function Activities(): ReactElement {
    return (
        <Flex>
            <Box w='300px' mr={4}>
                <ActivityCreateForm refetchQueriesOnCreate={[GET_ACTIVITIES_QUERY]}/>
            </Box>
            <Box flex='1' bg='white' rounded="base" boxShadow="md">
                <ActivityList />
            </Box>
        </Flex>
    )
}
