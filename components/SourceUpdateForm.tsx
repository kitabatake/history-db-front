import {gql, useMutation, useQuery} from "@apollo/client";
import {ReactElement, useState} from "react";
import PropTypes from 'prop-types'

const updateSourceQuery = gql`
mutation UpdateSource($id: Int!, $name: String!) {
    updateSource(id: $id, name: $name) {
        id,
        name
    }
} 
`;

const getSourceQuery = gql`
query getSource($id: Int!) {
    source(id: $id) {
        id,
        name
    }
} 
`;

function SourceUpdateForm({sourceId, sourcesGql, onSubmit}): ReactElement {
    const [updateSource] = useMutation(updateSourceQuery, {
        refetchQueries: [sourcesGql]
    });
    const [name, setName] = useState("");
    const {loading, error, data} = useQuery(getSourceQuery, {
        variables: {id: sourceId},
        onCompleted: (data => setName(data.source.name))
    });

    return (
        <div className="flex flex-col bg-white shadow-md px-8 py-6 rounded-lg">
            <div className="font-medium self-center text-xl text-gold-800">
                出典編集
            </div>
            {data && (
                <form
                    className="mt-2"
                    onSubmit={e => {
                        e.preventDefault();
                        updateSource({variables: {id: sourceId, name: name}});
                        setName('');
                        onSubmit();
                    }}
                >
                    <div className="mb-2">
                        <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                            名前:
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="text-sm p-2 rounded-2xl border border-gold-200 bg-gold-50 w-full shrink focus:outline-none focus:border-gold-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex w-20 mx-auto">
                        <button
                            type="submit"
                            className="focus:outline-none text-white tracking-wider text-sm sm:text-base bg-gold-500 hover:bg-gold-600 rounded-lg py-2 w-full transition
                                      duration-150  ease-in mt-2"
                        >
                            送信
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

SourceUpdateForm.propTypes = {
    sourceId: PropTypes.number.isRequired,
    sourcesGql: PropTypes.object,
    onSubmit: PropTypes.func,
}

export default SourceUpdateForm;