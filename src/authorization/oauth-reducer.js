import {createSlice} from "@reduxjs/toolkit";

export const oauthSlice = createSlice({
    name: "authorization",
    initialState: {
        accessToken: null,
        tokenType: null,
        expiresIn: null,
        refreshToken: null,
        scope: null,
        claims: {}
    },
    reducers: {
        setAuthorization: (state, action) => {
            console.log(action);
            const {
                access_token = null,
                token_type = null,
                expires_in = null,
                refresh_token = null,
                scope = null,
            } = action.payload
            const claims = JSON.parse(atob(access_token.split(".")[1]));
            state.accessToken = access_token;
            state.tokenType = token_type;
            state.expiresIn = expires_in;
            state.refreshToken = refresh_token;
            state.scope = scope;
            state.claims = claims;
        },
        unsetAuthorization: state => {
            state.accessToken = null;
            state.tokenType = null;
            state.expiresIn = null;
            state.refreshToken = null;
            state.scope = null;
            state.claims = {};
        },
    }
})

export const { setAuthorization, unsetAuthorization } = oauthSlice.actions;
export const oauthReducer = oauthSlice.reducer
