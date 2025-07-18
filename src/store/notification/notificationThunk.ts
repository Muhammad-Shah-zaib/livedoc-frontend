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
  DeleteNotificationResponse,
  DeletAllNotificationsResponse,
} from "./types";
import { API_ROUTES } from "@/environment/apiRoutes";

const GET_NOTIFICATIONS_ACTION = "notification/getNotifications";
const POST_NOTIFICATION_ACTION = "notification/postNotification";
const MARK_NOTIFICATION_READ_ACTION = "notification/markRead";
const MARK_NOTIFICATION_UNREAD_ACTION = "notification/markUnread";
const DELETE_NOTIFICATION_ACTION = "notification/deleteNotification";
const DELETE_ALL_NOTIFICATIONS_ACTION = "notification/deleteAllNotifications";

export const getNotificationsThunk = createAsyncThunk<
  GetNotificationsResponse,
  GetNotificationsPayload | void,
  { rejectValue: ErrorResponse }
>(GET_NOTIFICATIONS_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.get<GetNotificationsResponse>(
      API_ROUTES.NOTIFICATIONS.GET_POST,
      {
        params: payload,
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);
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
      API_ROUTES.NOTIFICATIONS.GET_POST,
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
      API_ROUTES.NOTIFICATIONS.MARK_READ(id),
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
      API_ROUTES.NOTIFICATIONS.UN_MARK_READ(id),
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

export const deleteNotificationThunk = createAsyncThunk<
  DeleteNotificationResponse,
  { id: number },
  { rejectValue: ErrorResponse }
>(DELETE_NOTIFICATION_ACTION, async ({ id }, thunkAPI) => {
  try {
    const response = await axios.delete<DeleteNotificationResponse>(
      API_ROUTES.NOTIFICATIONS.PATCH_PUT_DELETE(id),
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to delete notification";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});

export const deleteAllNotificationsThunk = createAsyncThunk<
  DeletAllNotificationsResponse,
  void,
  { rejectValue: ErrorResponse }
>(DELETE_ALL_NOTIFICATIONS_ACTION, async (_, thunkAPI) => {
  try {
    const response = await axios.delete<DeletAllNotificationsResponse>(
      API_ROUTES.NOTIFICATIONS.DELETE_ALL,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to delete all notifications";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});
