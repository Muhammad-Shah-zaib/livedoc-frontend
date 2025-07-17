// types/notification.ts

export interface Notification {
  id: number;
  message: string;
  type: "info" | "warning" | "success" | "error";
  is_read: boolean;
  created_at: string;
  recipient: number; // User ID of the recipient
}

export interface NotificationState {
  notifications: Notification[];
  total: number; // for unread badge or pagination
  loading: boolean;
  error: string | null;
  hasConnected: boolean; // for WebSocket handling
}

export interface GetNotificationsPayload {
  page?: number;
  page_size?: number;
  is_read?: boolean;
}

export interface GetNotificationsResponse {
  count: number;
  results: Notification[];
}

export interface PostNotificationPayload {
  message: string;
  type: "info" | "warning" | "success" | "error";
}

export interface PostNotificationResponse extends Notification {}

export interface MarkNotificationResponse extends Notification {}

export interface DeleteNotificationResponse {
  success: boolean;
  message: string;
}

export interface ErrorResponse {
  message: string;
  erros?: Record<string, string[]> | null;
}
