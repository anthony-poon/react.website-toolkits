import React from "react";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const widths = {
    sm: 500,
    md: 800,
    lg: 1100,
    xl: 1600
};

const useStyle = makeStyles(theme => ({
    container: {
        width: "100%",
        height: "100%",
        padding: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            width: ({variant}) => widths[variant],
            padding: theme.spacing(4),
            height: "initial"
        }
    }
}));

export const ResponsiveCard = ({ variant = "sm", children }) => {
    const classes = useStyle({ variant });
    return (
        <Card className={classes.container}>
            { children }
        </Card>
    )
}

ResponsiveCard.propTypes = {
    variant: PropTypes.oneOf([
        "sm",
        "md",
        "lg",
        "xl"
    ])
}