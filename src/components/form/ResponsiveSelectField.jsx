import { Box, FormHelperText, Grid, InputLabel, Select, useMediaQuery, useTheme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React from "react";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

const CompactSelectField = (props) => {
  const { isError, error, children, label, value, name, onChange, ...rest } = props;
  // TODO: implement required and subLabel
  // TODO: Fix label position when label is empty
  return (
    <Box mt={2}>
      <FormControl variant={"standard"} error={isError} style={{ width: "100%" }}>
        {label && <InputLabel shrink>{label}</InputLabel>}
        <Select
          fullWidth
          variant={"standard"}
          value={value ? value : ""}
          name={name}
          onChange={onChange}
          label={label}
          {...rest}>
          {children}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

const ExpandedSelectField = (props) => {
  const { isError, required, error, children, label, subLabel, value, name, onChange, ...rest } = props;
  return (
    <Grid container>
      <Grid item sm={3}>
        <Box pt={2}>
          <DualLineLabel title={label} subtitle={subLabel} required={required} />
        </Box>
      </Grid>
      <Grid item sm={9}>
        <Box mt={2} mb={1}>
          <FormControl variant={"standard"} error={isError} style={{ width: "100%" }}>
            <Select variant={"standard"} fullWidth value={value ? value : ""} name={name} onChange={onChange} {...rest}>
              {children}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export const ResponsiveSelectField = (props) => {
  const { gutter = true, compact = false, error, onChange, name, ...rest } = props;
  const handleChange = (evt) => onChange(name, evt.target.value);
  const isError = Boolean(error);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const passProps = {
    error,
    name,
    ...rest,
  };
  return (
    <FormFieldWrapper gutter={gutter}>
      <Box>
        {!compact && isDesktop ? (
          <ExpandedSelectField {...passProps} isError={isError} onChange={handleChange} />
        ) : (
          <CompactSelectField {...passProps} isError={isError} onChange={handleChange} />
        )}
      </Box>
    </FormFieldWrapper>
  );
};
