import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
    button: {
        width: 120
    }
}))

export const ActionButton = ({ component = Button, ...rest }) => {
    const classes = useStyle();
    const button = React.createElement(component, {
        size: "small",
        variant: "outlined",
        color: "primary",
        className: classes.button,
        ...rest
    });
    return (
        <Box mr={1}>
            { button }
        </Box>
    )
}