import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { unsetNotificationAction } from "../../redux";

const VALID_TYPE = new Set(["error", "warning", "info", "success"]);

export const ReduxNotificationBar = ({ duration = 6000 }) => {
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
      autoHideDuration={duration}
      onClose={handleNotificationClose}>
      <Alert elevation={6} variant={"filled"} severity={severity} onClose={handleNotificationClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};
