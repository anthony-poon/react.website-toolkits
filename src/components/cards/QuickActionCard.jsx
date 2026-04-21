import { Box } from "@mui/material";
import React from "react";

export const QuickActionCard = ({
  icon,
  title,
  description,
  onClick,
  iconBgColor = "rgba(0,119,59,0.08)",
  iconColor = "#00773B",
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        background: "#fff",
        border: "1px solid #DADCE0",
        borderRadius: "3px",
        padding: "18px 16px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        cursor: "pointer",
        transition: "all 0.15s",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        "&:hover": {
          borderColor: "#00773B",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          transform: "translateY(-1px)",
        },
      }}
    >
      {icon && (
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            backgroundColor: iconBgColor,
            color: iconColor,
            "& svg": {
              width: 20,
              height: 20,
            },
          }}
        >
          {icon}
        </Box>
      )}
      <Box>
        {title && (
          <Box
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#1A1A1A",
              mb: "2px",
            }}
          >
            {title}
          </Box>
        )}
        {description && (
          <Box
            sx={{
              fontSize: "11px",
              color: "#5F6368",
              lineHeight: 1.4,
            }}
          >
            {description}
          </Box>
        )}
      </Box>
    </Box>
  );
};
