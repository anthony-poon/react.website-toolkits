import { Tooltip } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const DrawerItem = ({ icon, text, url, disabled }) => {
  return (

        <ListItem button component={RouterLink} to={url} disabled={disabled}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>

  );
};
