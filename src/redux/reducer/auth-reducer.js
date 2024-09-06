import Joi from "joi";
import { REHYDRATE } from "redux-persist";

import { APP_LOGIN, APP_LOGOUT, APP_TEST_CENTER } from "../action";

const schema = Joi.object().keys({
  isLoggedIn: Joi.boolean().optional(),
  role: Joi.string().required().allow(null),
  expireAt: Joi.date().required().allow(null),
  userInfo: Joi.object().required(),
  isTesting: Joi.boolean().default(false),
});

const initState = Object.freeze({
  isLoggedIn: false,
  role: null,
  expireAt: null,
  userInfo: {},
  isTesting: false,
  testCenterId: null,
});

export const testCenterReducer = (state = {}, action) => {
  switch (action.type) {
    case APP_TEST_CENTER:
      return {
        ...action.payload.testCenter,
      };
    case APP_LOGOUT:
      return {}; // Reset test center state to null on logout
    default:
      return state;
  }
};

export const authReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case REHYDRATE:
      try {
        Joi.attempt(action.payload.authorization, schema);
        const { expireAt } = action.payload.authorization;
        if (expireAt < new Date().getTime() / 1000) {
          console.log("refreshToken expired");
          return {
            ...initState,
          };
        }
        return {
          ...action.payload.authorization,
        };
      } catch (e) {
        console.error(`Schema error when rehydrating authorization. message=${e.message}`);
        return {
          ...initState,
        };
      }
    case APP_LOGIN:
      return {
        isLoggedIn: true,
        ...action.payload,
      };
    case APP_LOGOUT:
      return {
        ...initState,
      };
    default:
      return state;
  }
};
