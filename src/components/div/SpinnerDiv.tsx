import React, { ReactNode } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, CircularProgress } from "@mui/material";

type SpinnerDivProps = {
  isLoading: boolean;
  isError?: boolean;
  children: ReactNode;
};

export const SpinnerDiv: React.FC<SpinnerDivProps> = ({ isLoading, isError, children }) => {
  const isDisplay = !isLoading && !isError;

  return (
    <>
      {isDisplay && children}
      {isError && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: 150, width: "100%" }}
        >
          <ErrorIcon />
        </Box>
      )}
      {isLoading && !isError && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: 150, width: "100%" }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};