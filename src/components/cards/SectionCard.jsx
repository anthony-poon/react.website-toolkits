import { Box } from "@mui/material";
import React from "react";

export const SectionCard = ({ title, badge, actions, children }) => {
  return (
    <Box
      sx={{
        background: "#fff",
        border: "1px solid #DADCE0",
        borderRadius: "3px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderBottom: "1px solid #EEEFF1",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {title && (
            <Box
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#1A1A1A",
              }}
            >
              {title}
            </Box>
          )}
          {badge}
        </Box>
        {actions && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {actions}
          </Box>
        )}
      </Box>
      <Box sx={{ padding: "20px" }}>
        {children}
      </Box>
    </Box>
  );
};
