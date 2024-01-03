import _ from "lodash";
import { useEffect, useState } from "react";

// Merge 2 object only if key exist in target
const merge = (target, input) => {
  return _.assign(target, _.pick(input, _.keys(target)));
};

// Convenience hook and handles onChange of controlled input component
export const makeFormData = (init) => {
  return (update = {}) => {
    const [formData, setFormData] = useState({ ...init });
    const [hasChange, setHasChange] = useState(false);
    const handleFormChange = (...args) => {
      if (args[0].target) {
        const { name, value } = args[0].target;
        setFormData((prev) => {
          return { ...merge(prev, { [name]: value }) };
        });
      } else {
        setFormData((prev) => {
          return { ...merge(prev, { [args[0]]: args[1] }) };
        });
      }
    };
    update = merge(init, update);
    useEffect(() => {
      setFormData((prev) => ({
        ...prev,
        ...update,
      }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...Object.values(update)]);
    const isEqual = _.isEqual(update, formData);
    useEffect(() => {
      setHasChange(!isEqual);
    }, [isEqual]);
    const resetFormData = () => setFormData({ ...init });
    return { formData, handleFormChange, setFormData, resetFormData, hasChange };
  };
};
