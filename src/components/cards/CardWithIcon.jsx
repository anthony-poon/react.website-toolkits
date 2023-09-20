import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";

import { ResponsiveCard } from "./ResponsiveCard";

const useStyle = makeStyles((theme) => ({
  titleText: {
    textAlign: "center",
  },
  helperText: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

export const CardWithIcon = ({ icon, title, subtitle, children }) => {
  const classes = useStyle();
  return (
    <ResponsiveCard className={classes.container}>
      <div>
        <div className={classes.iconContainer}>{icon}</div>
        {title && (
          <Typography variant={"h5"} className={classes.titleText}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant={"subtitle2"} className={classes.helperText} color={"textSecondary"}>
            {subtitle}
          </Typography>
        )}
        <div>{children}</div>
      </div>
    </ResponsiveCard>
  );
};
