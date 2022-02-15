import {SelectOption} from "../../lib/types/form";
import {ReactElement} from "react";
import AsyncSelect from "react-select/async";
import {loadPersonOptions} from "../../lib/form/utils";

interface PersonSelectProps {
    value?: SelectOption,
    onChange: (newValue: SelectOption|null) => void,
}

const PersonSelect = ({value, onChange}: PersonSelectProps): ReactElement => {
    return (
        <AsyncSelect<SelectOption, false>
            loadOptions={loadPersonOptions}
            value={value}
            onChange={onChange}
        />
    )
}
export default PersonSelect;