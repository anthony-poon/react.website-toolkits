import React from "react";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {Container} from "@material-ui/core";

const useStyle = makeStyles(theme => ({
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