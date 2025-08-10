import { ListItemButton } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export const DrawerItem = ({ icon, text, url, disabled, children, active }) => {
  const history = useHistory();
  const theme = useTheme();
  const render = children ? <>{children}</> :
   <ListItemText primary={text} 
         sx={active ? { color: theme.palette.primary.main, fontWeight: 600 } : { color: "#222" }}
         primaryTypographyProps={{
          sx: {
            overflowWrap: 'anywhere', lineHeight: 1.2, 
            display: 'block', maxWidth: '150px'
          }
      }}
   />;
  return (
    <ListItemButton
      disabled={disabled}
      onClick={() => url && history.push(url)}
      sx={
        active
          ? {
              bgcolor: `${theme.palette.primary.main}0D`, 
              color: theme.palette.primary.main,
              borderRadius: 2,
              fontWeight: 600,
              "& .MuiListItemIcon-root": { color: theme.palette.primary.main },
            }
          : undefined
      }
    >
      {icon? <ListItemIcon>{icon}</ListItemIcon> : ""}

      {render}
    </ListItemButton>
  );
};
