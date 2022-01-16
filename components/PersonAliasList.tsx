import {ReactElement, useState} from "react";
import {
    useCreatePersonAliasMutation,
    useDeletePersonAliasMutation,
    useGetPersonAliasesQuery
} from "../src/generated/graphql";
import {GET_PERSON_ALIASES_QUERY} from "../graphqls/personAlias";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

interface Props {
    personId: number
}

export const PersonAliasList = ({personId}: Props): ReactElement => {
    const {data} = useGetPersonAliasesQuery({variables: {personId: personId}});
    const [newAlias, setNewAlias] = useState("");
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
                        className="p-1 bg-gold-100 w-40 flex rounded"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setNewAlias("");
                            createPersonAliasMutation({
                                variables: {
                                    personId: personId,
                                    alias: newAlias,
                                }
                            })
                        }}
                    >
                        <input
                            className="text-xs flex-1 p-1 min-w-0 rounded"
                            value={newAlias}
                            onChange={e => setNewAlias(e.target.value)}
                        />
                        <button className="text-xs p-1 bg-gold-400 ml-2 rounded text-white">追加</button>
                    </form>
                </div>
                )}
        </>
    )
}