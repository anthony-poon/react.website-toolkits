const {useState, useCallback} = require("react");

export const useFormData = (init) => {
    const [ formData, setFormData ] = useState({ ...init });
    const handleFormChange = useCallback((evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        setFormData({
            ...formData,
            [name]: value,
        })
    }, [ formData ])
    return [ formData, handleFormChange ]
}