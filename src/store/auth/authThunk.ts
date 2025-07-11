import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_ROUTES } from "@/environment/apiRoutes";
import {
  type EmailPasswordLoginResponse,
  type EmailPasswordLoginPayload,
  type ErrorResponse,
  type GoogleAuthResponse,
  type GoogleLoginPayload,
} from "./types";

const GOOGLE_LOGIN_ACTION = "auth/login/google";
const EMAIL_PASSWORD_LOGIN_ACTION = "auth/login";

// Async thunk for goole login
export const googleLoginThunk = createAsyncThunk<
  GoogleAuthResponse, // return type (fulfilled)
  GoogleLoginPayload, // argument type
  { rejectValue: ErrorResponse } // error type
>(GOOGLE_LOGIN_ACTION, async (payload, thunkAPI) => {
  // Make API call to Google login endpoint
  try {
    const response = await axios.post<GoogleAuthResponse>(
      API_ROUTES.AUTH.googleLogin,
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
      API_ROUTES.AUTH.login,
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
