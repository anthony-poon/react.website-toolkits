import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { TimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import React from "react";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

const ExpandedTimePicker = (props) => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <Box pr={2} pt={2}>
          <Box display={"flex"}>
            <DualLineLabel title={props.label} subtitle={props.subLabel} required={props.required} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs>
        <Box pt={2} pb={1}>
          <TimePicker
            value={props.value}
            onChange={props.onChange}
            slotProps={{
              textField: {
                variant: "standard",
                fullWidth: true,
              },
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const CompactTimePicker = (props) => {
  return (
    <Grid container>
      <Grid item xs>
        <TimePicker
          value={props.value}
          label={props.label}
          onChange={props.onChange}
          slotProps={{
            textField: {
              variant: "standard",
              fullWidth: true,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export const ResponsiveTimePicker = (props) => {
  const dt = props.value ? DateTime.fromISO(props.value, { setZone: true }) : null;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const handleChange = (value) => {
    if (props.onChange) {
      console.log(value);
      props.onChange(
        props.name,
        value.toISOTime({
          suppressMilliseconds: true,
          suppressSeconds: true,
          includeOffset: false,
          includePrefix: false,
          extendedZone: false,
          format: "extended",
        }),
      );
    }
  };
  const { compact = false, gutter = true } = props;
  return (
    <FormFieldWrapper gutter={gutter}>
      <Box display={"flex"}>
        {!compact && isDesktop ? (
          <ExpandedTimePicker {...props} onChange={handleChange} value={dt} />
        ) : (
          <CompactTimePicker {...props} onChange={handleChange} value={dt} />
        )}
      </Box>
    </FormFieldWrapper>
  );
};
