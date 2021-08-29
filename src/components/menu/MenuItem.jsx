import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

export const MenuItem = ({ icon, text }) => {
    return (
        <ListItem button>
            <ListItemIcon>
                { icon }
            </ListItemIcon>
            <ListItemText primary={text}/>
        </ListItem>
    )
};