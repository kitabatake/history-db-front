import {gql, useMutation} from "@apollo/client";
import {ReactElement} from "react";
import PropTypes from 'prop-types'
import PersonForm, {PersonFormData} from "./PersonForm";

const createPersonQuery = gql`
mutation CreatePerson($name: String!, $description: String!) {
    createPerson(name: $name, description: $description) {
        id,
        name
    }
} 
`;

function PersonCreateForm({personsGql: personsGql}): ReactElement {
    const [createPerson] = useMutation(createPersonQuery, {
        refetchQueries: [personsGql]
    });

    return (
        <div className="flex flex-col bg-white shadow-md px-8 py-6 rounded-lg">
            <div className="font-medium text-xl text-gold-800">
                人物登録
            </div>
            <PersonForm
                onSubmit={(data: PersonFormData) => {
                    createPerson({variables: {name: data.name, description: data.description}});
                }}
            />
        </div>
    )
}

PersonCreateForm.propTypes = {
    personsGql: PropTypes.object
}

export default PersonCreateForm;