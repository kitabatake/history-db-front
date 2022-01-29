import {useForm} from "react-hook-form";
import classNames from "classnames";
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
            <FormControl isInvalid={errors.name ? true : false}>
                <FormLabel htmlFor='email'><Text fontSize='sm'>名前</Text></FormLabel>
                <Input
                    type="text"
                    {...register("name", { required: true })}
                    className={classNames(
                        "text-sm p-2 rounded-lg border w-full shrink",
                        {
                            'bg-gold-50': !errors.name,
                            'border-gold-200': !errors.name,
                            'bg-red-50': errors.name,
                            'border-red-200': errors.name,
                        }
                    )}
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

