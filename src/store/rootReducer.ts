import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import documentsReducer from "./documents/documentSlice";
import notificationReducer from "./notification/notificationSlice";
import { RESET_STORE } from "./store";

const appReducer = combineReducers({
  auth: authReducer,
  documents: documentsReducer,
  notification: notificationReducer,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
};
