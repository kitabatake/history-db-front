import {ReactElement} from "react";
import {PersonsSelect} from "../PersonsSelect";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, FormControl, FormLabel, Input, Text} from '@chakra-ui/react'

export interface PersonRelationFormData {
    description: string,
    persons: Array<{value: number, label: string}>
}
interface Props {
    defaultData?: PersonRelationFormData,
    onSubmit: (PersonRelationFormData) => void
}

export default function PersonRelationForm({defaultData = {description: "", persons: []}, onSubmit}: Props): ReactElement {
    const {register, control, reset, handleSubmit, formState: {errors}} = useForm<PersonRelationFormData>();
    return (
        <form
            className="mt-2"
            onSubmit={handleSubmit(data => {
                onSubmit({
                    description: data.description,
                    persons: data.persons
                });
                reset();
            })}
        >
            <FormControl mb='2'>
                <FormLabel><Text fontSize='sm'>概要</Text></FormLabel>
                <Input
                    type="text"
                    {...register("description")}
                    defaultValue={defaultData.description}
                />
            </FormControl>
            <FormControl mb='2'>
                <FormLabel><Text fontSize='sm'>人物</Text></FormLabel>
                <Controller
                    name="persons"
                    control={control}
                    defaultValue={defaultData.persons}
                    render={({ field }) =>(
                        <PersonsSelect
                            {...field}
                        />
                    )}
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
    )
}