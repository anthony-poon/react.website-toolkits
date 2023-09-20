import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";

const useStyle = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export const ClippedAppBar = ({ children, onDrawerToggle }) => {
  const classes = useStyle();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {onDrawerToggle && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
        )}
        {children}
      </Toolbar>
    </AppBar>
  );
};
