export const APP_LOGIN = "APP_LOGIN";
export const APP_LOGOUT = "APP_LOGOUT";
export const APP_TEST_CENTER = "APP_TEST_CENTER";

export const loginAction = ({ expireAt = null, role = null, userInfo = {} }) => {
  return {
    type: APP_LOGIN,
    payload: {
      expireAt,
      role,
      userInfo,
    },
  };
};

export const logoutAction = () => {
  return {
    type: APP_LOGOUT,
  };
};

export const getTestCenterAction = ( testCenter = {}) => {
  return {
    type: APP_TEST_CENTER,
    payload: {
      testCenter
    },
  };
};
