import { useTheme } from "@material-ui/core";
import React from "react";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

export const FormTitle = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <FormFieldWrapper>
      <DualLineLabel
        variant={"h5"}
        title={title}
        subtitle={subtitle}
        style={{
          color: theme.palette.primary.main,
        }}
      />
    </FormFieldWrapper>
  );
};
