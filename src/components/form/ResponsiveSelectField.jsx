import { Box, FormHelperText, Grid, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
  },
}));

export const ResponsiveSelectField = ({
  required,
  error,
  children,
  label,
  subLabel,
  value,
  name,
  onChange,
  ...rest
}) => {
  const classes = useStyle();
  const handleChange = (evt) => onChange(name, evt.target.value);
  const isError = Boolean(error);
  return (
    <FormFieldWrapper>
      <div className={classes.container}>
        <Hidden mdUp implementation={"js"}>
          <FormControl error={isError} style={{ width: "100%" }}>
            <Select fullWidth value={value ? value : ""} name={name} onChange={handleChange} isErr {...rest}>
              {children}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </Hidden>
        <Hidden smDown implementation={"js"}>
          <Grid container>
            <Grid item sm={3}>
              <Box pt={2}>
                <DualLineLabel title={label} subtitle={subLabel} required={required} />
              </Box>
            </Grid>
            <Grid item sm={9}>
              <Box mt={2} mb={1}>
                <FormControl error={isError} style={{ width: "100%" }}>
                  <Select fullWidth value={value ? value : ""} name={name} onChange={handleChange} {...rest}>
                    {children}
                  </Select>
                  {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Hidden>
      </div>
    </FormFieldWrapper>
  );
};
