import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { persistStore } from "redux-persist";

export const RESET_STORE = "auth/logout/fulfilled";

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export a typed version of useDispatch and useSelector hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
