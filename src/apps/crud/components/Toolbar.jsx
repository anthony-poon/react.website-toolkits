import React from "react";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import _ from "lodash";

export const ActionButton = ({ component = Button, ...rest }) => {
    const button = React.createElement(component, {
        size: "small",
        variant: "outlined",
        color: "primary",
        ...rest
    });
    return (
        <Box mb={1}>
            { button }
        </Box>
    )
}

export const Toolbar = ({ component = Button, options, onClick }) => {
    if (_.isEmpty(options)) {
        return null
    }
    return (
        <Box display={"flex"} flexDirection={"column"}>
            { options.map(option => {
                const {
                    value,
                    icon,
                    display,
                    ...rest
                } = option;
                return (
                    <ActionButton
                        fullWidth
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