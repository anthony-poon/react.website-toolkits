import {useState, useCallback, useEffect} from "react";
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

export const makeFormData = (init) => {
    return (update = {}) => {
        const [ formData, setFormData ] = useState({ ...init });
        const handleFormChange = (evt) => {
            const name = evt.target.name;
            const value = evt.target.value;
            setFormData({
                ...formData,
                [name]: _.cloneDeep(value),
            })
        }
        update = _.assign(init, _.pick(update, _.keys(init)));
        useEffect(() => {
            setFormData({...update});
        }, [...Object.values(update)])
        return { formData, handleFormChange, setFormData }
    }
}