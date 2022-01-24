import {ReactElement} from "react";
import {
    useCreatePersonAliasMutation,
    useDeletePersonAliasMutation,
    useGetPersonAliasesQuery
} from "../src/generated/graphql";
import {GET_PERSON_ALIASES_QUERY} from "../graphqls/personAlias";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";

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
                <div className="flex flex-wrap items-start gap-1 w-full">
                    {data.personAliases.map((alias, i) => (
                        <div key={i} className="p-1 text-xs bg-gold-100 text-gold-500 rounded">
                            {alias.alias}
                            <button
                                className="ml-2"
                                onClick={() => deletePersonAliasMutation({
                                    variables: {id: alias.id}
                                })}
                            >
                                <FontAwesomeIcon icon={faTimesCircle} />
                            </button>
                        </div>
                    ))}
                    <form
                        className="p-1 bg-gold-100 w-40 flex rounded ml-2"
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
                        <input
                            className="text-xs flex-1 p-1 min-w-0 rounded"
                            {...register("alias", { required: true })}
                        />
                        <button className="text-xs p-1 bg-gold-400 ml-2 rounded text-white">追加</button>
                    </form>
                </div>
                )}
        </>
    )
}