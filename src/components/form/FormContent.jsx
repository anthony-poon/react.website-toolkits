import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyle = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(3),
  },
}));

export const FormContent = ({ children }) => {
  const classes = useStyle();
  return <div className={classes.container}>{children}</div>;
};
