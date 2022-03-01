import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export const ActionButton = ({ component = Button, ...rest }) => {
    const button = React.createElement(component, {
        fullWidth: true,
        size: "small",
        color: "primary",
        variant: "outlined",
        ...rest
    });
    return (
        <Box mb={1}>
            { button }
        </Box>
    )
}

export const ActionColumn = ({ options, onClick }) => {
    return (
        <Box pt={2}>
            { options.map(option => {
                const {
                    value,
                    icon,
                    display,
                    ...rest
                } = option
                return (
                    <ActionButton
                        key={value}
                        onClick={() => onClick(value)}
                        startIcon={icon}
                        {...rest}
                    >
                        { display }
                    </ActionButton>
                )
            }) }
        </Box>
    )
}