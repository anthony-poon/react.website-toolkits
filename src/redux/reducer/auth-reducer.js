import { REHYDRATE } from "redux-persist";

import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REAUTHENTICATE, AUTH_SITE_KEY_SET } from "../action";

const initState = {
  version: null,
  siteKey: null,
  siteKeyExpireAt: null,
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
};

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
          return Object.assign({}, initState);
        }
        console.log(action.payload.authorization);
        // If refresh token expired, discard old state and require login
        const now = new Date().getTime() / 1000;
        const { refreshTokenExpireAt } = action.payload.authorization;
        let newState;
        if (now > refreshTokenExpireAt) {
          console.log("refreshToken expired");
          newState = Object.assign({}, initState);
        } else {
          newState = Object.assign({}, action.payload.authorization);
        }
        console.log(newState, action.payload.authorization);
        // If only accessToken expired, next API call will refresh the token
        const isSiteKeyExpired = now > action.payload.authorization.siteKeyExpireAt;
        if (isSiteKeyExpired) {
          newState.siteKey = null;
          newState.siteKeyExpireAt = null;
        }
        return newState;
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
        ...state,
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
    case AUTH_SITE_KEY_SET:
      const siteKey = action.payload.siteKey;
      const siteKeyExpireAt = new Date().getTime() / 1000 + 86400; // 1 day
      return {
        ...state,
        siteKey,
        siteKeyExpireAt,
      };
    default:
      return state;
  }
};
