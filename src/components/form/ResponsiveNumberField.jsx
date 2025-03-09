import React from "react";

import { ResponsiveTextField } from "./ResponsiveTextField";

export const ResponsiveNumberField = ({ onChange, naValue = "N/A", ...rest }) => {
  const handleChange = (name, value) => {
    if (value !== naValue && !/^[0-9]*$/.test(value)) {
      return;
    }
    onChange(name, value);
  };
  return (
    <ResponsiveTextField
      onChange={handleChange}
      naValue={naValue}
      {...rest}
      inputProps={{
        inputMode: "numeric",
      }}></ResponsiveTextField>
  );
};
