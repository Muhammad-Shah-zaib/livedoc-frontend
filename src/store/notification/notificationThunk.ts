import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// TODO: Add correct notification API endpoints to API_ROUTES in environment/apiRoutes.ts
import type {
  GetNotificationsPayload,
  GetNotificationsResponse,
  PostNotificationPayload,
  PostNotificationResponse,
  ErrorResponse,
  MarkNotificationResponse,
} from "./types";

const GET_NOTIFICATIONS_ACTION = "notification/getNotifications";
const POST_NOTIFICATION_ACTION = "notification/postNotification";
const MARK_NOTIFICATION_READ_ACTION = "notification/markRead";
const MARK_NOTIFICATION_UNREAD_ACTION = "notification/markUnread";

// TODO: Replace with actual API endpoints from your backend
const NOTIFICATIONS_GET_URL = "/api/notifications/";
const NOTIFICATIONS_POST_URL = "/api/notifications/";
const NOTIFICATION_MARK_READ_URL = (id: number) =>
  `/api/notifications/${id}/read/`;
const NOTIFICATION_MARK_UNREAD_URL = (id: number) =>
  `/api/notifications/${id}/unread/`;

export const getNotificationsThunk = createAsyncThunk<
  GetNotificationsResponse,
  GetNotificationsPayload | void,
  { rejectValue: ErrorResponse }
>(GET_NOTIFICATIONS_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.get<GetNotificationsResponse>(
      NOTIFICATIONS_GET_URL,
      {
        params: payload,
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to fetch notifications";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});

export const postNotificationThunk = createAsyncThunk<
  PostNotificationResponse,
  PostNotificationPayload,
  { rejectValue: ErrorResponse }
>(POST_NOTIFICATION_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.post<PostNotificationResponse>(
      NOTIFICATIONS_POST_URL,
      payload,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to post notification";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});

export const markNotificationReadThunk = createAsyncThunk<
  MarkNotificationResponse,
  { id: number },
  { rejectValue: ErrorResponse }
>(MARK_NOTIFICATION_READ_ACTION, async ({ id }, thunkAPI) => {
  try {
    const response = await axios.patch<MarkNotificationResponse>(
      NOTIFICATION_MARK_READ_URL(id),
      {},
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to mark notification as read";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});

export const markNotificationUnreadThunk = createAsyncThunk<
  MarkNotificationResponse,
  { id: number },
  { rejectValue: ErrorResponse }
>(MARK_NOTIFICATION_UNREAD_ACTION, async ({ id }, thunkAPI) => {
  try {
    const response = await axios.patch<MarkNotificationResponse>(
      NOTIFICATION_MARK_UNREAD_URL(id),
      {},
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to mark notification as unread";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});
