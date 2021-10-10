import React from "react";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyle = makeStyles(theme => ({
    button: {
        width: 120
    }
}))

export const ActionButton = ({ component = Button, classes, ...rest }) => {
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

export const Toolbar = ({ component = Button, options, onClick }) => {
    const classes = useStyle();
    return (
        <Box display={"flex"}>
            { options.map(option => {
                const {
                    value,
                    icon,
                    display,
                    ...rest
                } = option;
                return (
                    <ActionButton
                        classes={classes}
                        key={value}
                        onClick={() => onClick(value)}
                        startIcon={icon}
                        { ...rest }
                    >
                        { display }
                    </ActionButton>
                )
            }) }
        </Box>
    )
}