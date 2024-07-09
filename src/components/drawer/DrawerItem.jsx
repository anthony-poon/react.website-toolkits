import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const DrawerItem = ({ icon, text, url, disabled }) => {
  return (
    <ListItem button component={RouterLink} to={url} disabled={disabled} sx={{ pl: 0 ,py: .5}}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};
