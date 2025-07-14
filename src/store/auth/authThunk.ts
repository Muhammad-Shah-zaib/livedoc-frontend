import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_ROUTES } from "@/environment/apiRoutes";
import {
  type EmailPasswordLoginResponse,
  type EmailPasswordLoginPayload,
  type ErrorResponse,
  type GoogleAuthResponse,
  type GoogleLoginPayload,
  type EmailPasswordSignupPayload,
  type EmailPasswordSignupResponse,
  type LogoutResponse,
} from "./types";

const GOOGLE_LOGIN_ACTION = "auth/login/google";
const EMAIL_PASSWORD_LOGIN_ACTION = "auth/login";
const EMAIL_PASSWORD_SIGNUP_ACTION = "auth/signup";
const LOGOUT_ACTION = "auth/logout";

// Async thunk for goole login
export const googleLoginThunk = createAsyncThunk<
  GoogleAuthResponse, // return type (fulfilled)
  GoogleLoginPayload, // argument type
  { rejectValue: ErrorResponse } // error type
>(GOOGLE_LOGIN_ACTION, async (payload, thunkAPI) => {
  // Make API call to Google login endpoint
  try {
    const response = await axios.post<GoogleAuthResponse>(
      API_ROUTES.AUTH.GOOGLE_LOGIN,
      { token: payload.credential },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;

    // If the API call fails, reject with an error message
  } catch (error: unknown) {
    let message = "Google login failed";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});

// Async thunk for email-password login
export const emailPasswordLoginThunk = createAsyncThunk<
  EmailPasswordLoginResponse,
  EmailPasswordLoginPayload,
  { rejectValue: ErrorResponse }
>(EMAIL_PASSWORD_LOGIN_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.post<EmailPasswordLoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      payload,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;
  } catch (error: unknown) {
    let message = "Email and password login failed";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});

// Async thunk for email-password signup
export const emailPasswordSignupThunk = createAsyncThunk<
  EmailPasswordSignupResponse,
  EmailPasswordSignupPayload,
  { rejectValue: ErrorResponse }
>(EMAIL_PASSWORD_SIGNUP_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.post(API_ROUTES.AUTH.REGISTER, payload, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    let message = "Signup failed";
    let errors: Record<string, string[]> | null = null;

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
      errors = error.response?.data?.errors || null;
    }
    return thunkAPI.rejectWithValue({ message, errors });
  }
});

// Async thunk for logout
export const logoutThunk = createAsyncThunk<
  LogoutResponse,
  null,
  { rejectValue: ErrorResponse }
>(LOGOUT_ACTION, async (_, thunkAPI) => {
  try {
    const response = await axios.post<LogoutResponse>(
      API_ROUTES.AUTH.LOGOUT,
      {},
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Logout failed";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    return thunkAPI.rejectWithValue({
      message,
    });
  }
});
