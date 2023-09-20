import { SET_NOTIFICATION, UNSET_NOTIFICATION } from "../action";

const initState = Object.freeze({
  message: null,
  type: "info"
});

export const notificationReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...action.payload
      };
    case UNSET_NOTIFICATION:
      return {
        ...initState
      };
    default:
      return state;
  }
};
