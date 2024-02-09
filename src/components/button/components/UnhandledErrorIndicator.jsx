import ErrorIcon from "@material-ui/icons/Error";
import React from "react";

export const UnhandledErrorIndicator = () => {
  return (
    <span
      style={{
        zIndex: 2,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <ErrorIcon size={16} color="error" />
    </span>
  );
};
