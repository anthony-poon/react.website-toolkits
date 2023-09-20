import Joi from "joi";
import _ from "lodash";
import { useCallback, useState } from "react";

const formatJoiError = ({ error = {} }) => {
  const rtn = {};
  _.forEach(error.details, (e) => {
    rtn[e.context.key] = e.message;
  });
  return rtn;
};

export const useFormError = (init) => {
  const defaultErrors = { ...init };
  const [formErrors, setErrors] = useState({ ...defaultErrors });
  const handleValidate = useCallback(
    (data, schema) => {
      if (!schema || !Joi.isSchema(schema)) {
        throw new Error("Invalid Schema.");
      }
      const mapping = formatJoiError(schema.validate(data));
      const newError = {};
      _.forEach(defaultErrors, (value, key) => {
        newError[key] = mapping[key] ?? "";
      });
      setErrors(newError);
      return _.isEmpty(mapping);
    },
    [formErrors]
  );
  return { formErrors, handleValidate };
};
