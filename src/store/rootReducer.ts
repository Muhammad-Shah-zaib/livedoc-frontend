import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
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
const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
};

// Persist config — choose which slices to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "documents", "theme", "settings"],
};

// Wrap the root reducer with redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
