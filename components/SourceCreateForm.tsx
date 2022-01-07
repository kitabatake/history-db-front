import {gql, useMutation} from "@apollo/client";
import {ReactElement, useState} from "react";
import PropTypes from 'prop-types'
import SourceForm, {SourceFormData} from "./SourceForm";

const createSourceQuery = gql`
mutation CreateSource($name: String!) {
    createSource(name: $name) {
        id,
        name
    }
} 
`;

function SourceCreateForm({sourcesGql: sourcesGql}): ReactElement {
    const [createSource] = useMutation(createSourceQuery, {
        refetchQueries: [sourcesGql]
    });
    // const [name, setName] = useState("");

    return (
        <div className="flex flex-col bg-white shadow-md px-8 py-6 rounded-lg">
            <div className="font-medium self-center text-xl text-gold-800">
                出典登録
            </div>
            <SourceForm
                defaultData={{name: ""}}
                onSubmit={(data: SourceFormData) => {
                    createSource({variables: {name: data.name}});
                }}
            />
            {/*<form*/}
            {/*    className="mt-2"*/}
            {/*    onSubmit={e => {*/}
            {/*        e.preventDefault();*/}
            {/*        createSource({variables: {name: name}});*/}
            {/*        setName('');*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <div className="mb-2">*/}
            {/*        <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">*/}
            {/*            名前:*/}
            {/*        </label>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            name="name"*/}
            {/*            className="text-sm p-2 rounded-2xl border border-gold-200 bg-gold-50 w-full shrink focus:outline-none focus:border-gold-400"*/}
            {/*            value={name}*/}
            {/*            onChange={(e) => setName(e.target.value)}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="flex w-20 mx-auto">*/}
            {/*        <button*/}
            {/*            type="submit"*/}
            {/*            className="focus:outline-none text-white tracking-wider text-sm sm:text-base bg-gold-500 hover:bg-gold-600 rounded-lg py-2 w-full transition*/}
            {/*                          duration-150  ease-in mt-2"*/}
            {/*        >*/}
            {/*            送信*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    )
}

SourceCreateForm.propTypes = {
    sourcesGql: PropTypes.object
}

export default SourceCreateForm;