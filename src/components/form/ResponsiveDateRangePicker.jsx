import { Grid } from "@mui/material";
import _ from "lodash";
import { DateTime } from "luxon";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ResponsiveDatePicker } from "./ResponsiveDatePicker";

export const ResponsiveDateRangePicker = (props) => {
  const { t } = useTranslation();
  // TODO: Fix eslint problem
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(
    _.debounce((name, value) => {
      if (name === "startDate") {
        props.onChange({
          startDate: value,
          endDate: props.value.endDate,
        });
      } else {
        props.onChange({
          startDate: props.value.startDate,
          endDate: value,
        });
      }
    }, 500),
    [],
  );
  return (
    <Grid container>
      <Grid item xs={6}>
        <ResponsiveDatePicker
          compact={true}
          label={t("start.date")}
          name={"startDate"}
          value={props.value.startDate}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <ResponsiveDatePicker
          compact={true}
          label={t("end.date")}
          name={"endDate"}
          value={props.value.endDate}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

ResponsiveDateRangePicker.defaultProps = {
  value: {
    startDate: DateTime.now().toISODate(),
    endDate: DateTime.now().toISODate(),
  },
};

ResponsiveDateRangePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    startDate: PropTypes.string.isRequired, // Need full iso date time string
    endDate: PropTypes.string.isRequired,
  }),
};
