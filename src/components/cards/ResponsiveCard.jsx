import React from "react";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";

const width = 500;

const useStyle = makeStyles(theme => ({
    container: {
        width: "100%",
        [theme.breakpoints.down("xs")]: {
            height: "100%",
        },
        [theme.breakpoints.up("sm")]: {
            width: width
        },
        padding: theme.spacing(5),
    }
}));

export const ResponsiveCard = ({ children }) => {
    const classes = useStyle();
    return (
        <Card className={classes.container}>
            { children }
        </Card>
    )
}