import { createSlice } from "@reduxjs/toolkit";

// types
import type { IAuthState } from "./types";
import { googleLoginThunk, emailPasswordLoginThunk } from "./authThunk";

const initialState: IAuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  generalError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // implement logout login later
    },
  },
  extraReducers: (builder) => {
    builder
      // google login
      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.generalError = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.generalError = null;
        state.user = payload.user;
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.generalError = action.payload?.message || "Google login failed";
      })
      // email password login
      .addCase(emailPasswordLoginThunk.pending, (state) => {
        state.loading = true;
        state.generalError = null;
      })
      .addCase(emailPasswordLoginThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.generalError = null;
        state.user = payload.user;
      })
      .addCase(emailPasswordLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.generalError = action.payload?.message || "either email or password is incorrect";
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
