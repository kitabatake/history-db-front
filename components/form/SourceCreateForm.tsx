import {ReactElement} from "react";
import SourceForm, {SourceFormData} from "./SourceForm";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";
import {useCreateSourceMutation} from "../../src/generated/graphql";
import {Box, Text} from "@chakra-ui/react";

interface Props {
    refetchQueriesOnCreate: RefetchQueryDescriptor[]
}

export default function SourceCreateForm({refetchQueriesOnCreate} : Props): ReactElement {
    const [createSource] = useCreateSourceMutation({
        refetchQueries: refetchQueriesOnCreate
    });

    return (
        <Box bg='white' px='3' py='4' rounded="base" boxShadow="md">
            <Text mb='2'>出典登録</Text>
            <SourceForm
                defaultData={{name: ""}}
                onSubmit={(data: SourceFormData) => {
                    createSource({variables: {name: data.name}});
                }}
            />
        </Box>
    )
}