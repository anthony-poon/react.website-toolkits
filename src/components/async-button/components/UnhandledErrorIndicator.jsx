import {makeStyles} from "@material-ui/core/styles";
import ErrorIcon from '@material-ui/icons/Error';
import React from "react";
const useStyles = makeStyles({
    container : {
        zIndex: 2,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})

export const UnhandledErrorIndicator = () => {
    const classes = useStyles();
    return (
        <span className={classes.container}>
            <ErrorIcon size={16} color="error"/>
        </span>
    )
}