export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const UNSET_NOTIFICATION = "UNSET_NOTIFICATION";

export const setNotificationAction = ({ message = null, type = "info" }) => {
  return {
    type: SET_NOTIFICATION,
    payload: {
      message,
      type,
    },
  };
};

export const unsetNotificationAction = () => {
  return {
    type: UNSET_NOTIFICATION,
  };
};

export const setSuccessMsg = (message) => {
  return {
    type: SET_NOTIFICATION,
    payload: {
      message,
      type: "success",
    },
  };
};

export const setErrorMsg = (error) => {
  let message;
  if (typeof error === "string") {
    message = error;
  } else if (error.response?.data?.message) {
    message = error.response?.data?.message || error.message;
  } else if (error.response?.status === 401) {
    // I am unable to get spring boot to return 401 with gracefully. There are ways, but feels hacky
    // instead I am just going to override the error message
    message = "Authentication failed. Please login again";
  } else {
    message = error.message;
  }
  return {
    type: SET_NOTIFICATION,
    payload: {
      message: message,
      type: "error",
    },
  };
};

export const setInfoMsg = (message) => {
  return {
    type: SET_NOTIFICATION,
    payload: {
      message,
      type: "info",
    },
  };
};

export const setWarnMsg = (message) => {
  return {
    type: SET_NOTIFICATION,
    payload: {
      message,
      type: "warning",
    },
  };
};
