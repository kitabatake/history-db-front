import {ReactElement} from "react";
import PersonSelect from "./PersonSelect";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, FormControl, FormLabel, Input, Text} from '@chakra-ui/react'
import {SelectOption} from "../../lib/types/form";

export interface RelatedPersonFormData {
    label: string,
    from?: SelectOption,
    to?: SelectOption
}
interface Props {
    defaultData?: RelatedPersonFormData,
    onSubmit: (data: RelatedPersonFormData) => void
}

export default function RelatedPersonForm({defaultData = {label: "", from: undefined, to: undefined}, onSubmit}: Props): ReactElement {
    const {register, control, reset, handleSubmit} = useForm<RelatedPersonFormData>();
    return (
        <form
            className="mt-2"
            onSubmit={handleSubmit(data => {
                onSubmit({
                    label: data.label,
                    from: data.from,
                    to: data.to
                });
                reset();
            })}
        >
            <FormControl mb='2'>
                <FormLabel><Text fontSize='sm'>from</Text></FormLabel>
                <Controller
                    name="from"
                    control={control}
                    defaultValue={defaultData.from}
                    render={({ field }) =>(
                        <PersonSelect
                            {...field}
                        />
                    )}
                />
            </FormControl>
            <FormControl mb='2'>
                <FormLabel><Text fontSize='sm'>to</Text></FormLabel>
                <Controller
                    name="to"
                    control={control}
                    defaultValue={defaultData.to}
                    render={({ field }) =>(
                        <PersonSelect
                            {...field}
                        />
                    )}
                />
            </FormControl>
            <FormControl mb='2'>
                <FormLabel><Text fontSize='sm'>ラベル</Text></FormLabel>
                <Input
                    type="text"
                    {...register("label")}
                    defaultValue={defaultData.label}
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