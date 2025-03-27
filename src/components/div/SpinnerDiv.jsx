import ErrorIcon from "@mui/icons-material/Error";
import { Box, CircularProgress } from "@mui/material";
import React from "react";

const JSImplementation = ({ display, children }) => {
  if (!display) {
    return null;
  }
  return <>{children}</>;
};

const CSSImplementation = ({ display, children }) => {
  return (
    <div
      style={{
        display: display ? "initial" : "none",
      }}>
      {children}
    </div>
  );
};

export const SpinnerDiv = ({ isLoading, isError, children, implementation = "js" }) => {
  const display =
    implementation === "js" ? (
      <JSImplementation display={!isLoading && !isError}>{children}</JSImplementation>
    ) : implementation === "css" ? (
      <CSSImplementation display={!isLoading && !isError}>{children}</CSSImplementation>
    ) : null;
  const spinner = isError ? (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      style={{
        minHeight: 150,
        width: "100%",
      }}>
      <ErrorIcon />
    </Box>
  ) : isLoading ? (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      style={{
        minHeight: 150,
        width: "100%",
      }}>
      <CircularProgress />
    </Box>
  ) : null;
  return (
    <>
      {display}
      {spinner}
    </>
  );
};