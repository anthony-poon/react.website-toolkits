import { ListItemButton } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useHistory } from "react-router-dom";

export const DrawerItem = ({ icon, text, url, disabled, children }) => {
  const history = useHistory();
  const render = children ? <>{children}</> : <ListItemText primary={text} />;
  return (
    <ListItemButton disabled={disabled} onClick={() => history.push(url)}>
      <ListItemIcon>{icon}</ListItemIcon>
      {render}
    </ListItemButton>
  );
};
