import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, CircularProgress} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {LoadingIndicator} from "./components/LoadingIndicator";
import {UnhandledErrorIndicator} from "./components/UnhandledErrorIndicator";
const useStyles = makeStyles({
    container: {
        position: "relative"
    },
    children: {
        zIndex: 1
    }
})

const AsyncButton = ({ onClick, onFinish, onError, duration, children, color, variant, type, className, ...rest }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [isUnhandledError, setIsUnhandledError] = useState(false);
    let indicator = isUnhandledError ? <UnhandledErrorIndicator/>
        : isRunning ? <LoadingIndicator/>
        : null
    const classes = useStyles();

    const handleClick = async (evt) => {
        if (isRunning) {
            return;
        }
        setIsRunning(true);
        try {
            const rtn = await Promise.all([
                onClick && onClick(evt),
                new Promise(((resolve) => {
                    setTimeout(resolve, duration);
                }))
            ]);
            onFinish && onFinish(rtn[0]);
        } catch (e) {
            if (onError) {
                onError(e)
            } else {
                setIsUnhandledError(true);
                console.error(e);
            }
        } finally {
            setIsRunning(false);
        }
    }

    return (
        <Button
            color={color}
            className={`${classes.container} ${className}`}
            disabled={isUnhandledError || isRunning}
            onClick={evt => handleClick(evt)}
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

AsyncButton.defaultProps = {
    duration: 1500,
    type: "button",
    color: "primary",
    variant: "contained"
};

AsyncButton.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf([
        "default",
        "inherit",
        "primary",
        "secondary",
    ]),
    duration: PropTypes.number,
    type: PropTypes.oneOf([
        "button",
        "submit"
    ]),
    onClick: PropTypes.func,
    onFinish: PropTypes.func,
    onError: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
    variant: PropTypes.oneOf([
        "contained",
        "outlined"
    ]),
};

export {
    AsyncButton
}