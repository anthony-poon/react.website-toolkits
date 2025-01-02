import { REHYDRATE } from "redux-persist";

import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REAUTHENTICATE } from "../action";

const initState = Object.freeze({
  version: null,
  isLoggedIn: false,
  role: null,
  accessToken: null,
  accessTokenExpireAt: null,
  refreshToken: null,
  refreshTokenExpireAt: null,
  reauthToken: null,
  reauthTokenExpireAt: null,
  // Currently auth token and profile is bundled, meaning that both login and login as api must return user profile
  // A better way should be a loginAction should trigger a profile update call, however this is a side effect which requires
  // redux-thunk or etc, and I dont know how I feels about that
  userInfo: {},
  isTesting: false,
});

const parseToken = (token) => {
  const claims = JSON.parse(atob(token.split(".")[1]));
  return {
    userId: claims.userId,
    expireAt: claims.exp,
    profileId: claims.profileId,
    testCenterId: claims.testCenterId,
    authorities: claims.authorities,
  };
};

const getEffectiveRole = (authorities) => {
  const map = {};
  authorities.forEach((authority) => (map[authority] = true));
  if (map["ROLE_SUPER_ADMIN"]) {
    return "ROLE_SUPER_ADMIN";
  }
  if (map["ROLE_ADMIN"]) {
    return "ROLE_ADMIN";
  }
  if (map["ROLE_TEST_TAKER"]) {
    return "ROLE_TEST_TAKER";
  }
  return "ROLE_USER";
};

// Increment this number if need to invalidate old cache
const REHYDRATION_VERSION = 1;

export const authReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case REHYDRATE:
      try {
        // Invalidate old cache on code update
        if (action.payload.authorization.version !== REHYDRATION_VERSION) {
          return { ...initState };
        }
        // If refresh token expired, discard old state and require login
        const now = new Date().getTime() / 1000;
        const { reauthTokenExpireAt } = action.payload.authorization;
        if (now > reauthTokenExpireAt) {
          console.log("refreshToken expired");
          return {
            ...initState,
          };
        }
        // If only accessToken expired, next API call will refresh the token
        return {
          ...action.payload.authorization,
        };
      } catch (e) {
        console.error(`Schema error when rehydrating authorization. message=${e.message}`);
        return {
          ...initState,
        };
      }
    case AUTH_LOGIN:
      const { accessToken, refreshToken, userInfo } = action.payload;
      const { authorities, expireAt: accessTokenExpireAt } = parseToken(accessToken);
      const { expireAt: refreshTokenExpireAt } = parseToken(refreshToken);
      return {
        version: REHYDRATION_VERSION,
        isLoggedIn: true,
        role: getEffectiveRole(authorities),
        accessToken,
        accessTokenExpireAt,
        refreshToken,
        refreshTokenExpireAt,
        userInfo: { ...userInfo },
      };
    case AUTH_LOGOUT:
      return {
        ...initState,
      };
    case AUTH_REAUTHENTICATE:
      const claims = parseToken(action.payload.token);
      return {
        ...state,
        reauthToken: action.payload.token,
        reauthTokenExpireAt: claims.expireAt,
      };
    default:
      return state;
  }
};
