import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { NotificationState, Notification } from "./types";
import {
  getNotificationsThunk,
  postNotificationThunk,
  markNotificationReadThunk,
  markNotificationUnreadThunk,
} from "./notificationThunk";

// --------------------
// Initial State
// --------------------
const initialState: NotificationState = {
  notifications: [],
  total: 0,
  loading: false,
  error: null,
  hasConnected: false,
};

// --------------------
// Slice
// --------------------
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // Add a new notification to the list
    addNotification: (state, { payload }: PayloadAction<Notification>) => {
      state.notifications.unshift(payload);
      state.total = state.notifications.filter((n) => !n.is_read).length;
    },
    // Mark a notification as read by id
    markAsRead: (state, { payload }: PayloadAction<number>) => {
      const notif = state.notifications.find((n) => n.id === payload);
      if (notif && !notif.is_read) {
        notif.is_read = true;
        state.total = state.notifications.filter((n) => !n.is_read).length;
      }
    },
    // Remove all notifications
    clearNotifications: (state) => {
      state.notifications = [];
      state.total = 0;
    },
    // Set WebSocket connection state
    setHasConnected: (state, { payload }: PayloadAction<boolean>) => {
      state.hasConnected = payload;
    },
  },
  extraReducers: (builder) => {
    // --------------------
    // Get Notifications
    // --------------------
    builder
      .addCase(getNotificationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotificationsThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.notifications = payload.results;
        state.total = payload.count;
        state.error = null;
      })
      .addCase(getNotificationsThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Failed to fetch notifications";
      })

      // --------------------
      // Post Notification
      // --------------------
      .addCase(postNotificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postNotificationThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.notifications.unshift(payload);
        state.total = state.notifications.filter((n) => !n.is_read).length;
        state.error = null;
      })
      .addCase(postNotificationThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Failed to post notification";
      })

      // --------------------
      // Mark Notification as Read
      // --------------------
      .addCase(markNotificationReadThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationReadThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        const idx = state.notifications.findIndex((n) => n.id === payload.id);
        if (idx !== -1) {
          state.notifications[idx] = payload;
        }
        state.total = state.notifications.filter((n) => !n.is_read).length;
        state.error = null;
      })
      .addCase(markNotificationReadThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Failed to mark notification as read";
      })

      // --------------------
      // Mark Notification as Unread
      // --------------------
      .addCase(markNotificationUnreadThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationUnreadThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        const idx = state.notifications.findIndex((n) => n.id === payload.id);
        if (idx !== -1) {
          state.notifications[idx] = payload;
        }
        state.total = state.notifications.filter((n) => !n.is_read).length;
        state.error = null;
      })
      .addCase(markNotificationUnreadThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error =
          payload?.message || "Failed to mark notification as unread";
      });
  },
});

// --------------------
// Exports
// --------------------
export const {
  addNotification,
  markAsRead,
  clearNotifications,
  setHasConnected,
} = notificationSlice.actions;
export default notificationSlice.reducer;
