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

    return (
        <div className="flex flex-col bg-white shadow-md px-8 py-6 rounded-lg">
            <div className="font-medium self-center text-lg text-gold-800">
                出典登録
            </div>
            <SourceForm
                defaultData={{name: ""}}
                onSubmit={(data: SourceFormData) => {
                    createSource({variables: {name: data.name}});
                }}
            />
        </div>
    )
}

SourceCreateForm.propTypes = {
    sourcesGql: PropTypes.object
}

export default SourceCreateForm;