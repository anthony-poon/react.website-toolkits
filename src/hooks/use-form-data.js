import {useState, useCallback} from "react";
import _ from "lodash";
export const useFormData = (init) => {
    const [ formData, setFormData ] = useState({ ...init });
    const handleFormChange = useCallback((evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        setFormData({
            ...formData,
            [name]: _.cloneDeep(value),
        })
    }, [ formData ]);
    return { formData, handleFormChange, setFormData }
}