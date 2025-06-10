import { Grid, TextField, TextFieldProps, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import React from "react";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

type NAHandler = () => void;
type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

interface CommonFieldProps extends Omit<TextFieldProps, "error" | "onChange" | "value" | "name"> {
  error?: string;
  label?: string;
  subLabel?: string;
  value: string;
  name?: string;
  hasNA?: boolean;
  naLabel?: string;
  isNA?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  onChange: ChangeHandler;
  onNAChange: NAHandler;
  required?: boolean;
}

const CompactTextField: React.FC<CommonFieldProps> = ({
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
  isDisabled,
  ...rest
}) => {
  return (
    <Grid container>
      <Grid item xs>
        <TextField
          fullWidth
          variant="standard"
          error={isError}
          helperText={isError ? error : subLabel}
          label={label}
          value={value ?? ""}
          margin="normal"
          name={name}
          disabled={isDisabled || isNA}
          onChange={onChange}
          {...rest}
        />
      </Grid>
      {hasNA && (
        <Grid item xs={4}>
          <Box display="flex" alignItems="center" style={{ height: "100%" }} pt={2}>
            <Checkbox checked={!!isNA} onChange={onNAChange} disabled={isDisabled} />
            <Box flex={1}>{naLabel}</Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

const ExpandedTextField: React.FC<CommonFieldProps> = ({
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
  isDisabled,
  required,
  ...rest
}) => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <Box pr={2} pt={2}>
          <Box display="flex">
            <DualLineLabel title={label} subtitle={subLabel} required={required} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs>
        <TextField
          variant="standard"
          error={isError}
          fullWidth
          margin="normal"
          value={value ?? ""}
          helperText={error}
          name={name}
          disabled={isDisabled || isNA}
          onChange={onChange}
          {...rest}
        />
      </Grid>
      {hasNA && (
        <Grid item xs={2}>
          <Box display="flex" alignItems="center" style={{ height: "100%" }} pt={2} ml={2}>
            <Checkbox checked={!!isNA} onChange={onNAChange} disabled={isDisabled} />
            <Box flex={1}>{naLabel}</Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

interface ResponsiveTextFieldProps extends Omit<CommonFieldProps, "onChange" | "onNAChange"> {
  compact?: boolean;
  gutter?: boolean;
  naValue?: string;
  onChange?: (name: string, value: string) => void;
}

export const ResponsiveTextField: React.FC<ResponsiveTextFieldProps> = ({
  gutter = true,
  compact = false,
  error,
  value,
  hasNA,
  name,
  onChange,
  naValue = "N/A",
  ...rest
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isError = Boolean(error);
  const isNA = hasNA && value === naValue;

  const handleNAChecked = () => {
    if (!onChange) {
      return;
    }
    onChange(name, isNA ? "" : naValue);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) {
      return;
    }
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
      <Box display="flex">
        {!compact && isDesktop ? (
          <ExpandedTextField
            {...passProps}
            onChange={handleChange}
            onNAChange={handleNAChecked}
            isError={isError}
            isNA={isNA}
          />
        ) : (
          <CompactTextField
            {...passProps}
            onChange={handleChange}
            onNAChange={handleNAChecked}
            isError={isError}
            isNA={isNA}
          />
        )}
      </Box>
    </FormFieldWrapper>
  );
};
