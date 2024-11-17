import { Grid, TextField, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import React from "react";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

const CompactTextField = (props) => {
  const {
    error,
    label,
    subLabel,
    value,
    hasNA,
    name,
    onChange,
    onNAChange,
    naLabel = "N/A",
    isNA,
    isError,
    ...rest
  } = props;
  return (
    <Grid container>
      <Grid item xs>
        <TextField
          fullWidth
          variant={"standard"}
          error={isError}
          helperText={isError ? error : subLabel}
          label={label}
          value={value === undefined || value === null ? "" : value}
          margin={"normal"}
          name={name}
          disabled={isNA}
          onChange={onChange}
          {...rest}
        />
      </Grid>
      {hasNA && (
        <Grid item xs={4}>
          <Box display={"flex"} alignItems={"center"} style={{ height: "100%" }} pt={2}>
            <Checkbox checked={isNA} onChange={onNAChange} />
            <Box flex={1}>{naLabel}</Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

const ExpandedTextField = (props) => {
  const {
    error,
    label,
    subLabel,
    value,
    hasNA,
    name,
    required,
    onChange,
    onNAChange,
    naLabel = "N/A",
    isNA,
    isError,
    ...rest
  } = props;
  return (
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
          variant={"standard"}
          error={isError}
          fullWidth
          margin={"normal"}
          value={value === undefined || value === null ? "" : value}
          helperText={error}
          name={name}
          disabled={isNA}
          onChange={onChange}
          {...rest}
        />
      </Grid>
      {hasNA && (
        <Grid item xs={2}>
          <Box display={"flex"} alignItems={"center"} style={{ height: "100%" }} pt={2} ml={2}>
            <Checkbox checked={isNA} onChange={onNAChange} />
            <Box flex={1}>{naLabel}</Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export const ResponsiveTextField = (props) => {
  const { gutter = true, compact = false, error, value, hasNA, name, onChange, naValue = "N/A", ...rest } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
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
  const passProps = {
    error,
    value,
    hasNA,
    name,
    ...rest,
  };
  return (
    <FormFieldWrapper gutter={gutter}>
      <Box display={"flex"}>
        {!compact && isDesktop ? (
          <ExpandedTextField {...passProps} onChange={handleChange} onNAChange={handeNAChecked} isError={isError} />
        ) : (
          <CompactTextField
            {...passProps}
            onChange={handleChange}
            onNAChange={handeNAChecked}
            isError={isError}
            gutter={gutter}
          />
        )}
      </Box>
    </FormFieldWrapper>
  );
};
