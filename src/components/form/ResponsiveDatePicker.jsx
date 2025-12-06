import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import React from "react";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

const ExpandedDatePicker = (props) => {
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
          <DatePicker
            format="dd/MM/yy"
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

const CompactDatePicker = (props) => {
  return (
    <Grid container>
      <Grid item xs>
        <DatePicker
          format="dd/MM/yyyy"
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

export const ResponsiveDatePicker = (props) => {
  const dt = props.value ? DateTime.fromISO(props.value, { setZone: true }).startOf("day") : null;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const handleChange = (value) => {
    if (props.onChange) {
      const dt = DateTime.fromISO(value).startOf("day");
      props.onChange(props.name, dt.toISODate());
    }
  };
  const { compact = false, gutter = true } = props;
  return (
    <FormFieldWrapper gutter={gutter}>
      <Box display={"flex"}>
        {!compact && isDesktop ? (
          <ExpandedDatePicker {...props} onChange={handleChange} value={dt} />
        ) : (
          <CompactDatePicker {...props} onChange={handleChange} value={dt} />
        )}
      </Box>
    </FormFieldWrapper>
  );
};
