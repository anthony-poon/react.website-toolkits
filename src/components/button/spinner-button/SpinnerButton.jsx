import React from "react";
import PropTypes from "prop-types";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {UnhandledErrorIndicator} from "../components/UnhandledErrorIndicator";
import {LoadingIndicator} from "../components/LoadingIndicator";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
    container: {
        position: "relative"
    },
    children: {
        zIndex: 1
    }
})

export const SpinnerButton = ({ type, variant, color, className, children , isDisabled, isError, isLoading, onClick, isIcon, ...rest }) => {
    const classes = useStyles();
    let indicator = isError ? <UnhandledErrorIndicator/>
        : isLoading ? <LoadingIndicator/>
        : null
    const ButtonImpl = isIcon ? IconButton : Button;
    return (
        <ButtonImpl
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
        </ButtonImpl>
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