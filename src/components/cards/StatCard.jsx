import { Box } from "@mui/material";
import React from "react";

export const StatCard = ({
  icon,
  label,
  value,
  subtitle,
  accentColor = "#00773B",
  iconBgColor = "rgba(0,119,59,0.08)",
  iconColor = "#00773B",
}) => {
  return (
    <Box
      sx={{
        background: "#fff",
        border: "1px solid #DADCE0",
        borderRadius: "2px",
        padding: "16px 18px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: accentColor,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              color: "#9AA0A6",
              textTransform: "uppercase",
              letterSpacing: "0.4px",
              mb: "4px",
            }}
          >
            {label}
          </Box>
          <Box
            sx={{
              fontSize: "26px",
              fontWeight: 600,
              color: "#1A1A1A",
              lineHeight: 1,
              mb: "2px",
            }}
          >
            {value}
          </Box>
          {subtitle && (
            <Box
              sx={{
                fontSize: "11px",
                color: "#5F6368",
              }}
            >
              {subtitle}
            </Box>
          )}
        </Box>
        {icon && (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: iconBgColor,
              color: iconColor,
              flexShrink: 0,
              "& svg": {
                width: 18,
                height: 18,
              },
            }}
          >
            {icon}
          </Box>
        )}
      </Box>
    </Box>
  );
};
