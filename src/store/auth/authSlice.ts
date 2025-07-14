import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// types
import type { IAuthState } from "./types";
import {
  googleLoginThunk,
  emailPasswordLoginThunk,
  emailPasswordSignupThunk,
  logoutThunk,
} from "./authThunk";

const initialState: IAuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  generalError: null,
  email_verification_required: false,
  errors: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // implement logout login later
    },
    serVerifyEmailRequired: (state, { payload }: PayloadAction<boolean>) => {
      state.email_verification_required = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // google login
      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.generalError = null;
        state.errors = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.generalError = null;
        state.user = payload.user;
        state.errors = null;
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.generalError = action.payload?.message || "Google login failed";
        state.errors = action.payload?.errors || null;
      })
      // email password login
      .addCase(emailPasswordLoginThunk.pending, (state) => {
        state.loading = true;
        state.generalError = null;
        state.errors = null;
      })
      .addCase(emailPasswordLoginThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.generalError = null;
        state.user = payload.user;
        state.errors = null;
      })
      .addCase(emailPasswordLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.generalError =
          action.payload?.message || "either email or password is incorrect";
        state.errors = action.payload?.errors || null;
      })
      // email password signup
      .addCase(emailPasswordSignupThunk.pending, (state) => {
        state.loading = true;
        state.generalError = null;
        state.errors = null;
      })
      .addCase(emailPasswordSignupThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.generalError = null;
        state.email_verification_required = payload.email_verification_required;
        state.errors = null;
      })
      .addCase(emailPasswordSignupThunk.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload?.errors || null;
        state.generalError = action.payload?.message || "Email signup failed";
      })
      // logout
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.generalError = null;
        state.errors = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.generalError = null;
        state.user = null;
        state.errors = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.generalError = action.payload?.message || "Logout failed";
        state.errors = action.payload?.errors || null;
      });
  },
});

export const { logout, serVerifyEmailRequired } = authSlice.actions;
export default authSlice.reducer;
