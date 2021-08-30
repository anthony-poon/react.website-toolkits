import { REHYDRATE } from "redux-persist";
import {APP_LOGIN, APP_LOGOUT} from "../action";
import Joi from "joi";
import {DateTime} from "luxon";

const schema = Joi.object().keys({
    isLoggedIn: Joi.boolean().optional(),
    role: Joi.string().required().allow(null),
    expireAt: Joi.date().required().allow(null),
    userInfo: Joi.object().required(),
})

const initState = Object.freeze({
    isLoggedIn: false,
    role: null,
    expireAt: null,
    userInfo: {}
});

export const authReducer = ( state = {...initState}, action ) => {
    switch (action.type) {
        case REHYDRATE:
            try {
                Joi.attempt(action.payload.authorization, schema);
                const {expireAt} = action.payload.authorization;
                if (DateTime.fromISO(expireAt) < DateTime.now()) {
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
            console.log(action.payload);
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