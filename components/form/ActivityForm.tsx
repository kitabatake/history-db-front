import {ReactElement} from "react";
import AsyncSelect from "react-select/async";
import PersonsSelect from "./PersonsSelect";
import {apolloClient} from "../../apolloClient";
import {range} from "../../lib/util";
import {SEARCH_SOURCES_QUERY} from "../../graphqls/sources";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, FormControl, FormLabel, HStack, Input, Select, Text, Textarea} from '@chakra-ui/react'
import {SelectOption} from "../../lib/types/form";
import {Source} from "../../src/generated/graphql";

export interface ActivityFormData {
    description: string,
    persons: Array<SelectOption>,
    source?: SelectOption,
    year?: number,
    month?: number,
    day?: number
}
interface Props {
    defaultData?: ActivityFormData,
    onSubmit: (data: ActivityFormData) => void
}

function loadSourceOptions(input: string, callback: (options: SelectOption[]) => void) {
    if (!input) {
        return Promise.resolve({options: []});
    }

    return apolloClient.query({
        query: SEARCH_SOURCES_QUERY,
        variables: {nameForSearch: input}
    }).then((response) => {
        callback(response.data.sources.map((source: Source) => {
            return {
                value: source.id,
                label: source.name
            };
        }))
    });
}

export default function ActivityForm({defaultData = {description: "", persons: []}, onSubmit}: Props): ReactElement {
    const {register, control, reset, handleSubmit, formState: {errors}} = useForm<ActivityFormData>();
    return (
        <form
            className="mt-2"
            onSubmit={handleSubmit(data => {
                onSubmit({
                    description: data.description,
                    persons: data.persons,
                    source: data.source,
                    year: data.year,
                    month: data.month,
                    day: data.day,
                });
                reset();
            })}
        >
            <FormControl isInvalid={!!errors.description} mb='2'>
                <FormLabel><Text fontSize='sm'>概要</Text></FormLabel>
                <Textarea
                    {...register("description")}
                    defaultValue={defaultData.description}
                />
            </FormControl>
            <FormControl mb='2'>
                <FormLabel><Text fontSize='sm'>西暦</Text></FormLabel>
                <HStack spacing='2'>
                    <HStack spacing='1'>
                        <Input
                            size='xs'
                            w='50px'
                            type="text"
                            {...register("year", {valueAsNumber: true})}
                            defaultValue={defaultData.year}
                        />
                        <Text fontSize='xs'>年</Text>
                    </HStack>
                    <HStack>
                        <Select
                            variant='flushed'
                            size='xs'
                            {...register("month", {valueAsNumber: true})}
                            defaultValue={defaultData.month}
                        >
                            <option></option>
                            {range(1, 12).map(n => (<option key={n} value={n}>{n}</option>))}
                        </Select>
                        <Text fontSize='xs'>月</Text>
                    </HStack>
                    <HStack>
                        <Select
                            variant='flushed'
                            size='xs'
                            {...register("day", {valueAsNumber: true})}
                            defaultValue={defaultData.day}
                        >
                            <option></option>
                            {range(1, 31).map(n => (<option key={n} value={n}>{n}</option>))}
                        </Select>
                        <Text fontSize='xs'>日</Text>
                    </HStack>
                </HStack>
            </FormControl>
            <FormControl mb='2'>
                <FormLabel><Text fontSize='sm'>出典</Text></FormLabel>
                <Controller
                    name="source"
                    control={control}
                    defaultValue={defaultData.source}
                    render={({ field }) =>(
                        <AsyncSelect
                            {...field}
                            loadOptions={loadSourceOptions}
                        />
                    )}
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