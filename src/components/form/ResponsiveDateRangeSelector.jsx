import { Grid } from "@mui/material";
import { DateTime } from "luxon";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import { ResponsiveDatePicker } from "./ResponsiveDatePicker";

export const ResponsiveDateRangeSelector = (props) => {
  const { t } = useTranslation();
  const handleChange = (name, value) => {
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
  };
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

ResponsiveDateRangeSelector.defaultProps = {
  value: {
    startDate: DateTime.local().setZone("UTC").startOf("day").toISO(),
    endDate: DateTime.local().setZone("UTC").endOf("day").toISO(),
  },
};

ResponsiveDateRangeSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    startDate: PropTypes.string.isRequired, // Need full iso date time string
    endDate: PropTypes.string.isRequired,
  }),
};
