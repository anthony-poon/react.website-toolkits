import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { unsetNotificationAction } from "../../redux";

const AlertImpl = (props) => {
  return <Alert elevation={6} variant="filled" {...props} />;
};

const VALID_TYPE = new Set(["error", "warning", "info", "success"]);

export const ReduxNotificationBar = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const { message, type } = notification;
  const severity = VALID_TYPE.has(type) ? type : "info";

  const handleNotificationClose = () => {
    dispatch(unsetNotificationAction());
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
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
      }>
      <AlertImpl severity={severity}>{message}</AlertImpl>
    </Snackbar>
  );
};
