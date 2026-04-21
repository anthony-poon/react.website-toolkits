import { Box } from "@mui/material";
import React from "react";

export const EmptyStateCard = ({
  icon,
  title,
  description,
  actions,
  variant = "card",
}) => {
  const content = (
    <Box
      sx={{
        padding: "36px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {icon && (
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "12px",
            background: "rgba(0,119,59,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: "14px",
            "& svg": {
              width: 24,
              height: 24,
              color: "#00773B",
            },
          }}
        >
          {icon}
        </Box>
      )}
      {title && (
        <Box
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#1A1A1A",
            mb: "4px",
          }}
        >
          {title}
        </Box>
      )}
      {description && (
        <Box
          sx={{
            fontSize: "13px",
            color: "#5F6368",
            maxWidth: 320,
            lineHeight: 1.5,
            mb: actions ? "16px" : 0,
          }}
        >
          {description}
        </Box>
      )}
      {actions && (
        <Box
          sx={{
            display: "flex",
            gap: "8px",
          }}
        >
          {actions}
        </Box>
      )}
    </Box>
  );

  if (variant === "inline") {
    return content;
  }

  return (
    <Box
      sx={{
        background: "#fff",
        border: "1px solid #DADCE0",
        borderRadius: "3px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      {content}
    </Box>
  );
};
