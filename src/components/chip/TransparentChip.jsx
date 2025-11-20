import { Chip } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

// MUI chip only has filled and outlined variants, adding transparent variant here
const CHIP_COLORS = {
  green: { bg: "rgba(0, 119, 59, 0.22)", color: "#00773B"},
  yellow: { bg: "rgba(229, 189, 68, 0.33)", color: "#5D4600" },
};

export const TransparentChip = ({ color = "green", label, size = "small", ...props}) => {
  const styles = CHIP_COLORS[color] || CHIP_COLORS.green;

  return (
    <Chip
      label={label}
      size={size}
      sx={{
        backgroundColor: styles.bg,
        color: styles.color,
        fontWeight: "bold",
        height: { xs: 20, sm: 28 },
        fontSize: { xs: '0.6rem', sm: '0.8rem' },
        "& .MuiChip-label": {
          color: styles.color,
          fontWeight: "bold",
        }
      }}
      {...props}
    />
  );
};

TransparentChip.propTypes = {
  color: PropTypes.oneOf(["green", "yellow"]),
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium"]),
};