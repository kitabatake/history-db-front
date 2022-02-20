import {SelectOption} from "../../lib/types/form";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, FormControl, FormLabel, Input, Text} from "@chakra-ui/react";
import {apolloClient} from "../../apolloClient";
import {SEARCH_ACTIVITIES_QUERY} from "../../graphqls/activities";
import {Activity, useAddRelationshipToActivityMutation} from "../../src/generated/graphql";
import AsyncSelect from "react-select/async";
import {RefetchQueryDescriptor} from "@apollo/client/core/types";

// import {Activity} from "../../types";


interface FormData {
    label: String,
    activity: SelectOption
}

interface Props {
    personId: number,
    refetchQueries: RefetchQueryDescriptor[],
    onSubmit?: () => void
}

function loadActivitiesOptions(input: string, callback: (options: SelectOption[]) => void) {
    if (!input) {
        return Promise.resolve({options: []});
    }

    return apolloClient.query({
        query: SEARCH_ACTIVITIES_QUERY,
        variables: {nameForSearch: input}
    }).then((response) => {
        callback(response.data.activities.map((activity: Activity) => {
            return {
                value: activity.id,
                label: activity.name
            };
        }))
    });
}

const AddPersonActivityRelationshipForm = ({personId, refetchQueries, onSubmit}: Props) => {
    const {register, control, reset, handleSubmit, formState: {errors}} = useForm<FormData>();
    const [addRelationshipToActivityMutation] = useAddRelationshipToActivityMutation({
        refetchQueries: refetchQueries
    });
    return (
        <form
            className="mt-2"
            onSubmit={handleSubmit(data => {
                addRelationshipToActivityMutation({
                    variables: {
                        personId: personId,
                        activityId: data.activity.value,
                        label: data.label
                    }
                })
                reset();
                if (onSubmit) {
                    onSubmit()
                }
            })}
        >
            <FormControl isInvalid={!!errors.label} mb='2'>
                <FormLabel><Text fontSize='sm'>ラベル</Text></FormLabel>
                <Input
                    {...register("label")}
                />
            </FormControl>
            <FormControl mb='2'>
                <FormLabel><Text fontSize='sm'>アクティビティ</Text></FormLabel>
                <Controller
                    name="activity"
                    control={control}
                    render={({field}) => (
                        <AsyncSelect
                            {...field}
                            loadOptions={loadActivitiesOptions}
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
    );
}
export default AddPersonActivityRelationshipForm;