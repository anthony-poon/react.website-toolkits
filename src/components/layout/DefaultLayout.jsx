import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

export const DefaultLayout = ({ appBar, drawer, children }) => {
  return (
    <Box
      display={"flex"}
      style={{
        minHeight: "100vh",
      }}>
      <CssBaseline />
      {appBar}
      <Box flexGrow={1} display={"flex"} sx={{ mt: 10 }}>
        <Box>{drawer}</Box>
        <Box flexGrow={1} flexShrink={1} overflow={"auto"}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
