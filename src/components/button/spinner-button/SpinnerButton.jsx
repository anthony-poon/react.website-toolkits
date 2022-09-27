import React from "react";
import PropTypes from "prop-types";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {UnhandledErrorIndicator} from "../components/UnhandledErrorIndicator";
import {LoadingIndicator} from "../components/LoadingIndicator";

const useStyles = makeStyles({
    container: {
        position: "relative"
    },
    children: {
        zIndex: 1
    }
})

export const SpinnerButton = ({ type, variant, color, className, children , isDisabled, isError, isLoading, onClick, ...rest }) => {
    const classes = useStyles();
    let indicator = isError ? <UnhandledErrorIndicator/>
        : isLoading ? <LoadingIndicator/>
        : null
    return (
        <Button
            color={color}
            className={`${classes.container} ${className}`}
            disabled={isDisabled || isError || isLoading}
            onClick={onClick}
            type={type}
            variant={variant}
            {...rest}
        >
            {indicator}
            <div className={classes.children}>
                { children }
            </div>
        </Button>
    );
}


SpinnerButton.defaultProps = {
    type: "button",
    color: "primary",
    variant: "contained"
};

SpinnerButton.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf([
        "default",
        "inherit",
        "primary",
        "secondary",
    ]),
    type: PropTypes.oneOf([
        "button",
        "submit"
    ]),
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    variant: PropTypes.oneOf([
        "contained",
        "outlined"
    ]),
};