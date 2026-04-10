import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

export const DefaultLayout = ({ appBar, drawer, children, contentSx }) => {
  const merged = [{ mt: 10 }].concat(contentSx || []).filter(Boolean);
  return (
    <Box
      display={"flex"}
      style={{
        minHeight: "100vh",
      }}>
      <CssBaseline />
      {appBar}
      <Box flexGrow={1} display={"flex"} sx={merged}>
        <Box>{drawer}</Box>
        <Box flexGrow={1} flexShrink={1} overflow={"auto"}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
