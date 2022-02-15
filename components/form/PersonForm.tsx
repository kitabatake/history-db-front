import {ReactElement} from "react";
import {useForm} from "react-hook-form";
import {Box, Button, FormControl, FormLabel, Input, Text, Textarea} from '@chakra-ui/react'

export interface PersonFormData {
    name: string,
    description: string,
}

interface Props {
    defaultData?: PersonFormData,
    onSubmit: (data: PersonFormData) => void
}

export default function PersonForm({defaultData = {name: "", description: ""}, onSubmit}: Props): ReactElement {
    const {register, reset, handleSubmit, formState: {errors}} = useForm<PersonFormData>();
    return (
        <form
            onSubmit={handleSubmit(data => {
                onSubmit({
                    name: data.name,
                    description: data.description
                });
                reset();
            })}
        >
            <FormControl isInvalid={!!errors.name} mb={2}>
                <FormLabel><Text fontSize='sm'>名前</Text></FormLabel>
                <Input
                    type="text"
                    {...register("name", { required: true })}
                    defaultValue={defaultData.name}
                />
            </FormControl>
            <FormControl mb={2}>
                <FormLabel><Text fontSize='sm'>説明</Text></FormLabel>
                <Textarea
                    {...register("description")}
                    defaultValue={defaultData.description}
                />
            </FormControl>
            <Box textAlign='center'>
                <Button
                    type="submit"
                    colorScheme='gold'
                    size='sm'
                    mt='4'
                >
                    送信
                </Button>
            </Box>
        </form>
    );
}