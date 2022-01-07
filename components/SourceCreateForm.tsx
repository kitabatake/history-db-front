import {gql, useMutation} from "@apollo/client";
import {ReactElement} from "react";
import SourceForm, {SourceFormData} from "./SourceForm";
import {DocumentNode} from "graphql";
import {Source} from "../types";

const createSourceGql = gql`
mutation CreateSource($name: String!) {
    createSource(name: $name) {
        id,
        name
    }
} 
`;

interface createSourceVariables {
    name: string
}

interface Props {
    sourcesGql: DocumentNode
}

export default function SourceCreateForm({sourcesGql} : Props): ReactElement {
    const [createSource] = useMutation<Source, createSourceVariables>(createSourceGql, {
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