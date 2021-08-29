import React, {useState} from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MenuItem, ResponsiveMenu } from "../menu";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { ClippedAppBar } from "../app-bar";
import Toolbar from "@material-ui/core/Toolbar";

const drawerWidth = 240;

const useStyle = makeStyles(theme => ({
    root: {
        height: "100vh",
        display: "flex"
    },
    rhs: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
    },
    content: {
        flexGrow: 1,
        overflow: "auto",
    },
}))

export const DefaultLayout = ({ title, menuItems, children }) => {
    const classes = useStyle();
    const [ isDrawerOpen, setDrawerOpen ] = useState(false);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <ClippedAppBar
                handleDrawerToggle={() => setDrawerOpen(!isDrawerOpen)}
            >
                <Typography variant="h6" noWrap>
                    { title }
                </Typography>
            </ClippedAppBar>
            <ResponsiveMenu
                isOpen={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
                width={drawerWidth}
            >
                { menuItems.map((item, index) => (
                    <MenuItem
                        {...item}
                        key={index}
                    />
                ))}
            </ResponsiveMenu>
            <div className={classes.rhs}>
                <Toolbar/>
                <div className={classes.content}>
                    { children }
                </div>
            </div>

        </div>
    )
}