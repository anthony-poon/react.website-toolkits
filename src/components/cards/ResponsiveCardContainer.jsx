import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

export const ResponsiveCardContainer = ({ isCentered = false, noGutter = false, children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const style = {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "start",
    paddingTop: isDesktop && noGutter ? 0 : theme.spacing(0),
    paddingBottom: isDesktop && noGutter ? 0 : theme.spacing(5),
  };
  return <Box style={style}>{children}</Box>;
};
