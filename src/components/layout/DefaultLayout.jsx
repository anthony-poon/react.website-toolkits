import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
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
      {drawer}
      <Box flexGrow={1} display={"flex"} flexDirection={"column"}>
        <Toolbar />
        <Box flexGrow={1} overflow={"auto"}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
