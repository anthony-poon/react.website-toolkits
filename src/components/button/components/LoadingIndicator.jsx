import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  container: {
    zIndex: 2,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export const LoadingIndicator = () => {
  const classes = useStyles();
  return (
    <span className={classes.container}>
      {/* TODO Change color */}
      <CircularProgress size={16} color="secondary" />
    </span>
  );
};
