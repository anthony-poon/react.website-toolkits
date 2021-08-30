import React from "react";
import { Snackbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close"
import {useDispatch, useSelector} from "react-redux";
import {unsetNotificationAction} from "../../redux";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const VALID_TYPE = new Set([
    "error",
    "warning",
    "info",
    "success",
]);

export const ReduxNotificationBar = () => {
    const dispatch = useDispatch();
    const notification = useSelector(state => state.notification);
    const {
        message,
        type
    } = notification;
    const severity = VALID_TYPE.has(type) ? type : "info"

    const handleNotificationClose = () => {
        dispatch(unsetNotificationAction());
    }
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={Boolean(message)}
            autoHideDuration={6000}
            onClose={handleNotificationClose}
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleNotificationClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        >
            <Alert severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}