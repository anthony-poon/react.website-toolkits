import { Pagination, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

export const PaginationBar = ({ pageCount, currPage, onChange }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box py={2} display={"flex"} justifyContent={isDesktop ? "flex-end" : "space-around"}>
      <Pagination count={pageCount} page={currPage} onChange={onChange} />
    </Box>
  );
};
