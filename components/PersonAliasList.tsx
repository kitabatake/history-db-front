import {ReactElement, useState} from "react";
import {useForm} from "react-hook-form";
import {Box, Button, Flex, IconButton, Input, Text} from "@chakra-ui/react";
import {FiX} from 'react-icons/fi';
import {useAddPersonAliasMutation, useRemovePersonAliasMutation} from "../src/generated/graphql";

interface Props {
    personId: number,
    aliases: string[]
}

export const PersonAliasList = ({personId, aliases}: Props): ReactElement => {
    const [localAliases, setLocalAliases] = useState(aliases);
    const {register, reset, handleSubmit} = useForm();
    const [addPersonAliasMutation] = useAddPersonAliasMutation();
    const [removePersonAliasMutation] = useRemovePersonAliasMutation();
    return (
        <Flex wrap='wrap' align='start'>
            {localAliases.map((alias, i) => (
                <Flex alignItems='center' key={i} p={1} rounded='md' bg='gold.100' color='gold.500' mr={2}>
                    <Text fontSize='xs'>{alias}</Text>
                    <IconButton
                        aria-label='close'
                        icon={<FiX />}
                        size='xs'
                        colorScheme='gold'
                        ml={2}
                        onClick={() => {
                            setLocalAliases(localAliases.filter((a) => a != alias))
                            removePersonAliasMutation({
                                variables: {
                                    personId: personId,
                                    alias: alias,
                                }
                            })
                        }}
                    />
                </Flex>
            ))}
            <Box p={1} bg='green.100' w='140px' rounded='md' >
                <form
                    onSubmit={handleSubmit(data => {
                        setLocalAliases([...localAliases, data.alias])
                        console.log("hoge")
                        addPersonAliasMutation({
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
                    <Button type="submit" ml={1} colorScheme='green' size='xs'>追加</Button>
                </form>
            </Box>
        </Flex>
    )
}