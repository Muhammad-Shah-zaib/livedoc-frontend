import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import documentsReducer from "./documents/documentSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  documents: documentsReducer,
});
