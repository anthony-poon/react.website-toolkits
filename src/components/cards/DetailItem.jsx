import { Box } from "@mui/material";
import React from "react";

export const DetailItem = ({ label, value, subtitle }) => {
  return (
    <Box>
      <Box
        sx={{
          fontSize: "10px",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "#9AA0A6",
          mb: "2px",
        }}
      >
        {label}
      </Box>
      <Box
        sx={{
          fontSize: "13px",
          fontWeight: 400,
          color: "#1A1A1A",
        }}
      >
        {value}
      </Box>
      {subtitle && (
        <Box
          sx={{
            fontSize: "12px",
            color: "#5F6368",
            mt: "1px",
          }}
        >
          {subtitle}
        </Box>
      )}
    </Box>
  );
};
