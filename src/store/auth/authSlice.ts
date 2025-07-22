import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState, IUser } from "./types";
import {
  googleLoginThunk,
  emailPasswordLoginThunk,
  emailPasswordSignupThunk,
  logoutThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  getUserProfileThunk,
  getUserByEmailThunk,
  updateUserPorifleThunk,
} from "./authThunk";

// --------------------
// Initial State
// --------------------
const initialState: IAuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  generalError: null,
  email_verification_required: false,
  errors: null,
  forgetPasswordSuccess: false,
  resetPasswordSuccess: false,
  initialAuthChecked: false,
  foundUser: null,
  findingUser: false,
  errorFindingUser: null,
};

// --------------------
// Slice
// --------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set email verification required flag
    serVerifyEmailRequired: (state, { payload }: PayloadAction<boolean>) => {
      state.email_verification_required = payload;
    },
    // Set forget password success flag
    setForgetPasswordSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.forgetPasswordSuccess = payload;
    },
    // Set reset password success flag
    setResetPasswordSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.resetPasswordSuccess = payload;
    },
    // Set general error message
    setGeneralError: (state, { payload }: PayloadAction<string | null>) => {
      state.generalError = payload;
    },
    setFoundUser: (state, { payload }: PayloadAction<IUser | null>) => {
      state.foundUser = payload;
    },
    setErrorFindingUser: (state, { payload }: PayloadAction<string | null>) => {
      state.errorFindingUser = payload;
    },
  },
  extraReducers: (builder) => {
    // --------------------
    // Google Login
    // --------------------
    builder
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

      // --------------------
      // Email/Password Login
      // --------------------
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

      // --------------------
      // Email/Password Signup
      // --------------------
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

      // --------------------
      // Logout
      // --------------------
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
        state.generalError = null;
        state.errors = action.payload?.errors || null;
      })

      // --------------------
      // Forgot Password
      // --------------------
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

      // --------------------
      // Reset Password
      // --------------------
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
      })

      // --------------------
      // Get User Profile
      // --------------------
      .addCase(getUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.generalError = null;
        state.errors = null;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.generalError = null;
        state.initialAuthChecked = true;
        state.user = payload;
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.generalError = null;
        state.errors = action.payload?.errors || null;
        state.isAuthenticated = false;
        state.initialAuthChecked = true;
        state.user = null;
      })

      // --------------------
      // Get User By Email
      // --------------------
      .addCase(getUserByEmailThunk.pending, (state) => {
        state.generalError = null;
        state.errors = null;
        state.foundUser = null;
        state.findingUser = true;
        state.errorFindingUser = null;
      })
      .addCase(getUserByEmailThunk.fulfilled, (state, { payload }) => {
        state.findingUser = false;
        state.loading = false;
        state.foundUser = payload.user;
        state.generalError = null;
        state.errors = null;
      })
      .addCase(getUserByEmailThunk.rejected, (state, action) => {
        state.findingUser = false;
        state.loading = false;
        state.errorFindingUser = "User not found";
        state.foundUser = null;
        state.generalError =
          action.payload?.message || "Get user by email failed";
        state.errors = action.payload?.errors || null;
      })
      // --------------------
      // Update User Profile
      // --------------------
      .addCase(updateUserPorifleThunk.pending, (state) => {
        state.loading = true;
        state.generalError = null;
        state.errors = null;
      })
      .addCase(updateUserPorifleThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.generalError = null;
        state.errors = null;
        state.user = payload.user;
      })
      .addCase(updateUserPorifleThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.generalError = payload?.message || "Update user profile failed";
        state.errors = payload?.errors || null;
        state.user = null;
      });
  },
});

// --------------------
// Exports
// --------------------
export const {
  serVerifyEmailRequired,
  setForgetPasswordSuccess,
  setResetPasswordSuccess,
  setGeneralError,
  setErrorFindingUser,
  setFoundUser,
} = authSlice.actions;
export default authSlice.reducer;
