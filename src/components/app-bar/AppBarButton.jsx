import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {Menu, MenuItem} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";

export const AppBarButton = ({ icon, links }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(null);
    const handleOpen = evt => setAnchorEl(evt.currentTarget);
    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleOpen}
            >
                { icon }
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={isOpen}
                onClose={handleClose}
            >
                { links.map(link => (
                    <MenuItem key={link.url} component={RouterLink} to={link.url}>{link.text}</MenuItem>
                ))}
            </Menu>
        </div>
    )
}