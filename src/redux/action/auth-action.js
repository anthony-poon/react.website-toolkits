export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_REAUTHENTICATE = "AUTH_REAUTHENTICATE";
export const AUTH_SITE_KEY_SET = "AUTH_SITE_KEY_SET";

export const loginAction = ({ role, accessToken, refreshToken, userInfo }) => {
  return {
    type: AUTH_LOGIN,
    payload: { role, accessToken, refreshToken, userInfo },
  };
};

export const logoutAction = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const reauthenticateAction = (token) => {
  return {
    type: AUTH_REAUTHENTICATE,
    payload: {
      token,
    },
  };
};

export const setSiteKeyAction = (siteKey) => {
  return {
    type: AUTH_SITE_KEY_SET,
    payload: {
      siteKey,
    },
  };
};
