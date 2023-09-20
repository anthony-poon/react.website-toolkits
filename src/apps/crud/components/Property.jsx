import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import React from "react";

import { DualLineLabel } from "../../../components";

const SIZE_MAPPING = {
  small: {
    xs: 2,
    md: 2
  },
  medium: {
    xs: 5,
    md: 5
  },
  large: {
    xs: 12,
    md: 5
  },
  xlarge: {
    xs: 12,
    md: 12
  }
};

const PropertyLabel = ({ size, label, value }) => {
  const sizing = SIZE_MAPPING[size];
  return (
    <Grid item {...sizing}>
      <Box mb={1}>
        <DualLineLabel title={label} subtitle={value} inverted />
      </Box>
    </Grid>
  );
};

PropertyLabel.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large", "xlarge"])
};

export const Property = ({ item, schema }) => {
  return (
    <Grid container>
      {schema.map((s) => {
        const value = item[s.key];
        if (!value && s.skipIfEmpty) {
          return null;
        }
        return <PropertyLabel key={s.key} size={s.size} label={s.label} value={item[s.key]} />;
      })}
    </Grid>
  );
};
