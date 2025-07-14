import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState } from "./types";
import {
  googleLoginThunk,
  emailPasswordLoginThunk,
  emailPasswordSignupThunk,
  logoutThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
} from "./authThunk";
import { set } from "react-hook-form";

const initialState: IAuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  generalError: null,
  email_verification_required: false,
  errors: null,
  forgetPasswordSuccess: false,
  resetPasswordSuccess: false,
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
    setForgetPasswordSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.forgetPasswordSuccess = payload;
    },
    setResetPasswordSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.resetPasswordSuccess = payload;
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
      })
      // forgot password
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.generalError = null;
        state.errors = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.forgetPasswordSuccess = true;
        state.loading = false;
        state.generalError = null;
        state.errors = null;
      })
      .addCase(forgotPasswordThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.forgetPasswordSuccess = false;
        state.generalError = payload?.message || "Forgot password failed";
      })
      // reset password
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.generalError = null;
        state.errors = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.generalError = null;
        state.errors = null;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPasswordThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.generalError = payload?.message || "Reset password failed";
        state.errors = payload?.errors || null;
      });
  },
});

export const {
  logout,
  serVerifyEmailRequired,
  setForgetPasswordSuccess,
  setResetPasswordSuccess,
} = authSlice.actions;
export default authSlice.reducer;
