import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: rootReducer
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// Export a typed version of useDispatch and useSelector hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();