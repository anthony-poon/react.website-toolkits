import { Grid, TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

const useStyle = makeStyles(() => ({
  container: {
    display: "flex",
  },
  label: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
}));

export const ResponsiveTextField = ({
  error,
  label,
  subLabel,
  value,
  hasNA,
  name,
  required,
  onChange,
  naLabel = "N/A",
  naValue = "N/A",
  ...rest
}) => {
  const classes = useStyle();
  const isError = Boolean(error);
  const isNA = hasNA && value === naValue;
  const handeNAChecked = () => {
    if (isNA) {
      onChange(name, "");
    } else {
      onChange(name, naValue);
    }
  };
  const handleChange = (evt) => {
    onChange(name, evt.target.value);
  };
  return (
    <FormFieldWrapper>
      <div className={classes.container}>
        <Hidden mdUp implementation={"js"}>
          <Grid container>
            <Grid item xs>
              <TextField
                fullWidth
                error={isError}
                helperText={isError ? error : subLabel}
                label={label}
                value={value === undefined || value === null ? "" : value}
                margin={"normal"}
                name={name}
                disabled={isNA}
                onChange={handleChange}
                {...rest}
              />
            </Grid>
            {hasNA && (
              <Grid item xs={4}>
                <Box display={"flex"} alignItems={"center"} style={{ height: "100%" }} pt={2}>
                  <Checkbox checked={isNA} onChange={handeNAChecked} />
                  <Box flex={1}>{naLabel}</Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </Hidden>
        <Hidden smDown implementation={"js"}>
          <Grid container>
            <Grid item xs={3}>
              <Box pr={2} pt={2}>
                <Box display={"flex"}>
                  <DualLineLabel title={label} subtitle={subLabel} required={required} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs>
              <TextField
                error={isError}
                fullWidth
                margin={"normal"}
                value={value === undefined || value === null ? "" : value}
                helperText={error}
                name={name}
                disabled={isNA}
                onChange={handleChange}
                {...rest}
              />
            </Grid>
            {hasNA && (
              <Grid item xs={2}>
                <Box display={"flex"} alignItems={"center"} style={{ height: "100%" }} pt={2} ml={2}>
                  <Checkbox checked={isNA} onChange={handeNAChecked} />
                  <Box flex={1}>{naLabel}</Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </Hidden>
      </div>
    </FormFieldWrapper>
  );
};
