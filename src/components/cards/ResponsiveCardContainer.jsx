import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyle = makeStyles(theme => ({
    container: {
        minHeight: "100%",
        [theme.breakpoints.up("sm")]: {
            height: "initial",
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
        },
        display: "flex",
        alignItems: ({ isCentered }) => isCentered ? "center" : "start",
        justifyContent: "center"
    },
}))

export const ResponsiveCardContainer = ({ isCentered = false, children }) => {
    const classes = useStyle({ isCentered })
    return (
        <div className={classes.container}>
            {children}
        </div>
    )
}