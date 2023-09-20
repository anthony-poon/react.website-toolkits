import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  container: {
    minHeight: "100%",
    [theme.breakpoints.up("sm")]: {
      height: "initial",
      paddingTop: ({ noGutter }) => theme.spacing(noGutter ? 0 : 5),
      paddingBottom: ({ noGutter }) => theme.spacing(noGutter ? 0 : 5),
    },
    display: "flex",
    alignItems: ({ isCentered }) => (isCentered ? "center" : "start"),
    justifyContent: "center",
  },
}));

export const ResponsiveCardContainer = ({ isCentered = false, noGutter = false, children }) => {
  const classes = useStyle({ isCentered, noGutter });
  return <div className={classes.container}>{children}</div>;
};
