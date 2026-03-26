import { Box, Switch, Typography, styled } from "@mui/material";
import React from "react";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 46,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 3,
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: "none",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 18,
    height: 18,
    boxShadow: "none",
    backgroundColor: "#333",
  },
  "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
    backgroundColor: "#fff",
  },
  "& .MuiSwitch-track": {
    borderRadius: 12,
    border: "2px solid #767676",
    backgroundColor: "transparent",
    opacity: 1,
  },
}));

export const OnOffSwitch = (props: React.ComponentProps<typeof Switch>) => (
  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, ml: 1.5 }}>
    <StyledSwitch {...props} />
    <Typography variant="body2" sx={{ fontSize: 13, color: "#333", userSelect: "none" }}>
      {props.checked ? "On" : "Off"}
    </Typography>
  </Box>
);
