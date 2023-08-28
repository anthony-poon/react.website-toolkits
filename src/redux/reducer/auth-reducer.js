import { REHYDRATE } from "redux-persist";
import {APP_LOGIN, APP_LOGOUT} from "../action";
import Joi from "joi";

const schema = Joi.object().keys({
    isLoggedIn: Joi.boolean().optional(),
    role: Joi.string().required().allow(null),
    expireAt: Joi.date().required().allow(null),
    userInfo: Joi.object().required(),
    isTesting: Joi.boolean().default(false)
})

const initState = Object.freeze({
    isLoggedIn: false,
    role: null,
    expireAt: null,
    userInfo: {},
    isTesting: false,
});

export const authReducer = ( state = {...initState}, action ) => {
    switch (action.type) {
        case REHYDRATE:
            try {
                Joi.attempt(action.payload.authorization, schema);
                const {expireAt} = action.payload.authorization;
                if (expireAt < ((new Date()).getTime() / 1000)) {
                    console.log("refreshToken expired");
                    return {
                        ...initState
                    }
                }
                return {
                    ...action.payload.authorization
                }
            } catch (e) {
                console.error(`Schema error when rehydrating authorization. message=${e.message}`);
                return {
                    ...initState
                };
            }
        case APP_LOGIN:
            return {
                isLoggedIn: true,
                ...action.payload
            }
        case APP_LOGOUT:
            return {
                ...initState
            }
        default:
            return state;
    }
}