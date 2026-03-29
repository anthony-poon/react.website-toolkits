import React from "react";
import { Box, BoxProps } from "@mui/material";

export const AdminTableContainer = ({ children, sx, ...rest }: BoxProps) => (
  <Box
    sx={{
      "& .MuiDataGrid-toolbarContainer": { order: 2 },
      {/* !important needed to override DataGrid's inline styles */}
      "& .MuiTablePagination-spacer": { display: "none !important" },
      "& .MuiTablePagination-toolbar": { paddingLeft: "0 !important" },
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Box>
);
