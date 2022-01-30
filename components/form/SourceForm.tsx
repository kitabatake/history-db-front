import {useForm} from "react-hook-form";
import {Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text} from '@chakra-ui/react'

export interface SourceFormData {
    name: string
}
interface Props {
    defaultData?: SourceFormData,
    onSubmit: (SourceFormData) => void
}

export default function SourceForm({defaultData = {name: ""}, onSubmit}: Props) {
    const {register, reset, handleSubmit, formState: {errors}} = useForm<SourceFormData>();
    return (
        <form
            onSubmit={handleSubmit(data => {
                onSubmit({
                    name: data.name,
                });
                reset();
            })}
        >
            <FormControl isInvalid={!!errors.name}>
                <FormLabel><Text fontSize='sm'>名前</Text></FormLabel>
                <Input
                    type="text"
                    {...register("name", { required: true })}
                    defaultValue={defaultData.name}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
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
    )
}

