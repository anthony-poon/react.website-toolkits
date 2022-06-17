import React from "react";
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import PropTypes from "prop-types"

const useStyle = makeStyles(theme => ({
    spinnerContainer: {
        width: "100%",
        minHeight: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}));

const JSImplementation = ({ display, children }) => {
    if (!display) {
        return null;
    }
    return (
        <>
            { children }
        </>
    )
}

const CSSImplementation = ({ display, children }) => {
    return (
        <div style={{
            display: display ? "initial" : "none"
        }}>
            { children }
        </div>
    )
}


export const SpinnerDiv = ({ isLoading, isError, children, implementation = "js" }) => {
    const classes = useStyle();
    const display =
        implementation === "js" ? (
            <JSImplementation
                display={!isLoading && !isError}
            >
                { children }
            </JSImplementation>
        ) : implementation === "css" ? (
            <CSSImplementation
                display={!isLoading && !isError}
            >
                { children }
            </CSSImplementation>
        ) : null;
    const spinner =
        isError ? (
            <div className={classes.spinnerContainer}>
                <ErrorIcon/>
            </div>
        ) : isLoading ? (
            <div className={classes.spinnerContainer}>
                <CircularProgress/>
            </div>
        ) : null
    return (
        <>
            { display }
            { spinner }
        </>
    )
}

SpinnerDiv.defaultProps = {
    state: "none"
}

SpinnerDiv.propTypes = {
    state: PropTypes.oneOf([
        "none",
        "loading",
        "error",
    ])
}