import {ReactElement} from "react";
import {
    useCreatePersonAliasMutation,
    useDeletePersonAliasMutation,
    useGetPersonAliasesQuery
} from "../src/generated/graphql";
import {GET_PERSON_ALIASES_QUERY} from "../graphqls/personAlias";
import {useForm} from "react-hook-form";
import {Box, Button, Flex, IconButton, Input, Text} from "@chakra-ui/react";
import {FiX} from 'react-icons/fi';

interface Props {
    personId: number
}

export const PersonAliasList = ({personId}: Props): ReactElement => {
    const {data} = useGetPersonAliasesQuery({variables: {personId: personId}});
    const {register, reset, handleSubmit} = useForm();
    const [createPersonAliasMutation] = useCreatePersonAliasMutation({
        refetchQueries: [GET_PERSON_ALIASES_QUERY]
    });
    const [deletePersonAliasMutation] = useDeletePersonAliasMutation({
        refetchQueries: [GET_PERSON_ALIASES_QUERY]
    });
    return (
        <>
            {data && (
                <Flex wrap='wrap' align='start'>
                    {data.personAliases.map((alias, i) => (
                        <Flex alignItems='center' key={i} p={1} rounded='md' bg='gold.100' color='gold.500'>
                            <Text fontSize='xs'>{alias.alias}</Text>
                            <IconButton
                                aria-label='close'
                                icon={<FiX />}
                                size='xs'
                                colorScheme='gold'
                                ml={2}
                                onClick={() => deletePersonAliasMutation({
                                    variables: {id: alias.id}
                                })}
                            />
                        </Flex>
                    ))}
                    <Box p={1} bg='green.100' w='140px' rounded='md' ml={2} >
                        <form
                            onSubmit={handleSubmit(data => {
                                createPersonAliasMutation({
                                    variables: {
                                        personId: personId,
                                        alias: data.alias,
                                    }
                                })
                                reset();
                            })}
                        >
                            <Input
                                size='xs'
                                w='88px'
                                bg='white'
                                {...register("alias", { required: true })}
                            />
                            <Button ml={1} colorScheme='green' size='xs'>追加</Button>
                        </form>
                    </Box>
                </Flex>
                )}
        </>
    )
}