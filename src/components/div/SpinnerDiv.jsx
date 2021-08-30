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


export const SpinnerDiv = ({ state, children, implementation = "js" }) => {
    const classes = useStyle();
    const Implementation =
        implementation === "js" ? (
            <JSImplementation
                display={state === "none"}
            >
                { children }
            </JSImplementation>
        ) : implementation === "css" ? (
            <CSSImplementation
                display={state === "none"}
            >
                { children }
            </CSSImplementation>
        ) : null;
    return (
        <>
            { Implementation }
            { state === "loading" && (
                <div className={classes.spinnerContainer}>
                    <CircularProgress/>
                </div>
            ) }
            { state === "error" && (
                <div className={classes.spinnerContainer}>
                    <ErrorIcon/>
                </div>
            ) }
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