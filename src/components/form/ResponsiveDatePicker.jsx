import { Grid, TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import React from "react";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

export const ResponsiveDatePicker = ({ error, label, subLabel, value, name, onChange, required, ...rest }) => {
  const isError = Boolean(error);
  const handleChange = (evt) => onChange(name, evt.target.value);
  return (
    <FormFieldWrapper>
      <Box display={"flex"}>
        <Hidden mdUp implementation={"js"}>
          <TextField
            error={isError}
            helperText={isError ? error : subLabel}
            value={value ? value : ""}
            margin={"normal"}
            {...rest}
            onChange={handleChange}
          />
        </Hidden>
        <Hidden smDown implementation={"js"}>
          <Grid container>
            <Grid item sm={3}>
              <Box pr={2} pt={2}>
                <DualLineLabel title={label} subtitle={subLabel} required={required} />
              </Box>
            </Grid>
            <Grid item sm={9}>
              <TextField
                error={isError}
                helperText={isError ? error : subLabel}
                type={"date"}
                InputLabelProps={{
                  shrink: true,
                }}
                value={value ? value : ""}
                margin={"normal"}
                onChange={handleChange}
                {...rest}
              />
            </Grid>
          </Grid>
        </Hidden>
      </Box>
    </FormFieldWrapper>
  );
};
