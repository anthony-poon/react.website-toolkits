import { makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex"
  },
  rhs: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flexGrow: 1,
    overflow: "auto"
  }
}));

export const DefaultLayout = ({ appBar, drawer, children }) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <CssBaseline />
      {appBar}
      {drawer}
      <div className={classes.rhs}>
        <Toolbar />
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};
