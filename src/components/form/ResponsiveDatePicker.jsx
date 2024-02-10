import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import React from "react";

import { FormFieldWrapper } from "./FormFieldWrapper";

export const ResponsiveDatePicker = (props) => {
  const dt = props.value ? DateTime.fromISO(props.value, { setZone: true }) : null;
  const handleChange = (value) => {
    if (props.onChange) {
      const dt = DateTime.fromISO(value);
      props.onChange(props.name, dt.toISO());
    }
  };
  return (
    <FormFieldWrapper gutter={props.gutter}>
      <DatePicker
        value={dt}
        label={props.label}
        onChange={handleChange}
        slotProps={{
          textField: {
            variant: "standard",
            fullWidth: true,
          },
        }}
      />
    </FormFieldWrapper>
  );
};
