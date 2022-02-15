import {ReactElement} from "react";
import AsyncSelect from "react-select/async";
import {MultiValue} from "react-select";
import {SelectOption} from "../../lib/types/form";
import {loadPersonOptions} from "../../lib/form/utils";

interface PersonsSelectProps {
    value: SelectOption[],
    onChange: (newValue: SelectOption[]) => void,
}

const PersonsSelect = ({value, onChange}: PersonsSelectProps): ReactElement => {
    return (
        <AsyncSelect<SelectOption, true>
            loadOptions={loadPersonOptions}
            isMulti
            value={value}
            onChange={onChange as ((newValue: MultiValue<SelectOption>) => void)}
        />
    )
}
export default PersonsSelect;