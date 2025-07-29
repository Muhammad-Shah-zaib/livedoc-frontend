import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import documentsReducer from "./documents/documentSlice";
import notificationReducer from "./notification/notificationSlice";
import themeReducer from "./theme/themeSlice";
import settingsReducer from "./settings/settingsSlice";
import { RESET_STORE } from "./store"; // Custom action

// Combine all slice reducers
const appReducer = combineReducers({
  auth: authReducer,
  documents: documentsReducer,
  notification: notificationReducer,
  theme: themeReducer,
  settings: settingsReducer,
});

// Wrap combined reducer with custom logic to handle RESET_STORE
export const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
};
