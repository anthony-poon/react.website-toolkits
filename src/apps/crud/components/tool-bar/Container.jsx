import Box from "@material-ui/core/Box";
import React from "react";

export const Container = ({ children }) => {
  return <Box display={"flex"}>{children}</Box>;
};
