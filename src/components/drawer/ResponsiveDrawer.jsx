import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";

const useStyles = props => {
    const {
        width = 240
    } = props
    return (
        makeStyles(theme => ({
            drawer: {
                [theme.breakpoints.up('md')]: {
                    width,
                    flexShrink: 0,
                },
            },
            drawerPaper: {
                width,
            },
            drawerContainer: {
                overflow: 'auto',
            }
        }))
    )
};


export const ResponsiveDrawer = ({ children, isOpen, onClose, width }) => {
    const classes = useStyles({ width })();
    return (
        <nav className={classes.drawer}>
            <Hidden mdUp implementation={"js"}>
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor={"left"}
                    variant="temporary"
                    open={isOpen}
                    onClose={onClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <Toolbar />
                    <div>
                        <List>
                            <div className={classes.drawerContainer}>
                                { children }
                            </div>
                        </List>
                    </div>
                </Drawer>
            </Hidden>
            <Hidden smDown implementation={"js"}>
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    <Toolbar />
                    <div>
                        <List>
                            <div className={classes.drawerContainer}>
                                { children }
                            </div>
                        </List>
                    </div>
                </Drawer>
            </Hidden>
        </nav>
    )
}