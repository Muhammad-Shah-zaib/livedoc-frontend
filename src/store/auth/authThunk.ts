import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "@/environment/apiRoutes";
import type {
  EmailPasswordLoginResponse,
  EmailPasswordLoginPayload,
  ErrorResponse,
  GoogleAuthResponse,
  GoogleLoginPayload,
  EmailPasswordSignupPayload,
  EmailPasswordSignupResponse,
  LogoutResponse,
  GetUserProfileResponse,
  GetUserByEmailPayload,
  GetUserByEmailResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  GetAllUsersResponse,
  LiveblocksAuthResponse,
  LiveblocksAuthPayload,
} from "./types";
import { wait } from "@/utils/wait";

const GOOGLE_LOGIN_ACTION = "auth/login/google";
const EMAIL_PASSWORD_LOGIN_ACTION = "auth/login";
const EMAIL_PASSWORD_SIGNUP_ACTION = "auth/signup";
const LOGOUT_ACTION = "auth/logout";
const GET_USER_PROFILE_ACTION = "auth/get-user-profile";
const GET_USER_BY_EMAIL_ACTION = "auth/get-user-by-email";
const UPDATE_USER_PROFILE_ACTION = "auth/update-user-profile";

const GET_ALL_USERS_ACTION = "auth/get-all-users";

export const googleLoginThunk = createAsyncThunk<
  GoogleAuthResponse,
  GoogleLoginPayload,
  { rejectValue: ErrorResponse }
>(GOOGLE_LOGIN_ACTION, async (payload, thunkAPI) => {
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

  } catch (error: unknown) {
    let message = "Google login failed";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});

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

export const logoutThunk = createAsyncThunk<
  LogoutResponse,
  void,
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

export const getUserProfileThunk = createAsyncThunk<
  GetUserProfileResponse,
  void,
  { rejectValue: ErrorResponse }
>(GET_USER_PROFILE_ACTION, async (__dirname, thunkAPI) => {
  try {
    const response = await axios.get<GetUserProfileResponse>(
      API_ROUTES.AUTH.GET_USER_PROFILE,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;
  } catch (error) {
    let message = "Failed to get user profile";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});

export const getUserByEmailThunk = createAsyncThunk<
  GetUserByEmailResponse,
  GetUserByEmailPayload,
  { rejectValue: ErrorResponse }
>(GET_USER_BY_EMAIL_ACTION, async ({ email }, thunkAPI) => {
  try {
    const response = await axios.get<GetUserByEmailResponse>(
      API_ROUTES.AUTH.GET_USER_BY_EMAIL,
      {
        params: { email },
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    await wait(300);
    return response.data;
  } catch (error) {
    await wait(300);

    let message = "Failed to get user by email";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});

export const updateUserPorifleThunk = createAsyncThunk<
  UpdateUserProfileResponse,
  UpdateUserProfileRequest,
  { rejectValue: ErrorResponse }
>(UPDATE_USER_PROFILE_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.patch<UpdateUserProfileResponse>(
      API_ROUTES.AUTH.UPDATE_USER_PROFILE,
      payload,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to update user profile";
    let errors: Record<string, string[]> | null = null;

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
      errors = error.response?.data?.errors || null;
    }

    return thunkAPI.rejectWithValue({ message, errors });
  }
});

export const getAllUsersThunk = createAsyncThunk<
  GetAllUsersResponse,
  void,
  { rejectValue: ErrorResponse }
>(GET_ALL_USERS_ACTION, async (_, thunkAPI) => {
  try {
    const response = await axios.get<GetAllUsersResponse>(
      API_ROUTES.AUTH.GET_ALL_USERS,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to get all users";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});

export const getLiveblocksTokenThunk = createAsyncThunk<
  LiveblocksAuthResponse,
  LiveblocksAuthPayload,
  { rejectValue: ErrorResponse }
>("liveblocks/getToken", async (payload, thunkAPI) => {
  try {
    const response = await axios.post<LiveblocksAuthResponse>(
      API_ROUTES.LIVEBLOCKS.AUTH,
      payload,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to authenticate with Liveblocks";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || error.message || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});
