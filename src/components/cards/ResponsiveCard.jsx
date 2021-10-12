import React from "react";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {Container} from "@material-ui/core";

const widths = {
    sm: 500,
    md: 800,
    lg: 1100,
    xl: "100vw"
};

const useStyle = makeStyles(theme => ({
    // container: {
    //     width: "100%",
    //     height: "100%",
    //     padding: theme.spacing(2),
    //     [theme.breakpoints.up("sm")]: {
    //         width: ({variant}) => widths[variant],
    //         padding: theme.spacing(4),
    //         height: "initial"
    //     }
    // }
    card: {
        width: "100%",
        padding: theme.spacing(4)
    }
}));

export const ResponsiveCard = ({ variant = "sm", children }) => {
    const classes = useStyle({ variant });
    return (
        <Container maxWidth={variant} disableGutters>
            <Card className={classes.card}>
                { children }
            </Card>
        </Container>
    )
}

ResponsiveCard.propTypes = {
    variant: PropTypes.oneOf([
        "xs",
        "sm",
        "md",
        "lg",
        "xl"
    ])
}