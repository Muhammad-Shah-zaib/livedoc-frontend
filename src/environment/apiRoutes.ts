const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_API_URL}/login/`,
    LOGOUT: `${BASE_API_URL}/logout/`,
    REGISTER: `${BASE_API_URL}/register/`,
    GOOGLE_LOGIN: `${BASE_API_URL}/login/google/`,
    GET_USER_PROFILE: `${BASE_API_URL}/user/get-profile/`,
    GET_USER_BY_EMAIL: `${BASE_API_URL}/user/by-email`,
    UPDATE_USER_PROFILE: `${BASE_API_URL}/user/update-profile/`,
    GET_ALL_USERS: `${BASE_API_URL}/user/all/`,
    GET_USERS_BY_EMAIL_LIST: `${BASE_API_URL}/user/by-emails/`,
    GET_LIVE_USER_EMAILS: `${BASE_API_URL}/user/live-users-emails/`,
    FORGOT_PASSWORD: `${BASE_API_URL}/password_reset/`,
    RESET_PASSWORD_CONFIRM: `${BASE_API_URL}/password_reset/confirm/`,
  },
  DOCUMENTS: {
    GET_POST: `${BASE_API_URL}/documents/`,
    PATCH_PUT_DELETE: (id: number) => `${BASE_API_URL}/documents/${id}/`,
    GET_DETAIL_BY_SHARE_TOKEN: (share_token: string) => {
      return `${BASE_API_URL}/documents/by-token/${share_token}/`;
    },
    CHECK_LIVE_ACCESS: (share_token: string) =>
      `${BASE_API_URL}/documents/${share_token}/can-connect`,
    GET_LIVE_USERS: (document_id: number) =>
      `${BASE_API_URL}/document/${document_id}/users/`,
    GET_SUMMARY: (document_id: number) =>
      `${BASE_API_URL}/ai/documents/summarize/${document_id}/`,
  },
  NOTIFICATIONS: {
    GET_POST: `${BASE_API_URL}/notifications/`,
    MARK_READ: (id: number) =>
      `${BASE_API_URL}/notifications/${id}/mark_as_read/`,
    UN_MARK_READ: (id: number) =>
      `${BASE_API_URL}/notifications/${id}/mark_as_unread/`,
    PATCH_PUT_DELETE: (id: number) => `${BASE_API_URL}/notifications/${id}/`,
    DELETE_ALL: `${BASE_API_URL}/notifications/delete_all/`,
  },
  DOCUMENT_ACCESS: {
    GET_POST: `${BASE_API_URL}/document_access/`,
    PATCH_PUT_DELETE: (id: number) => `${BASE_API_URL}/document_access/${id}/`,
    REQUEST_ACCESS: (share_token: string) =>
      `${BASE_API_URL}/documents/${share_token}/request-access`,
    APPROVE_ACCESS: (id: number) =>
      `${BASE_API_URL}/document_access/${id}/approve-access`,
    REVOKE_ACCESS: (id: number) =>
      `${BASE_API_URL}/document_access/${id}/revoke-access`,
    GRANT_ACCESS: `${BASE_API_URL}/document_access/grant-access/`,
  },
  LIVEBLOCKS: {
    AUTH: `https://liveblock-auth-node.onrender.com/api/liveblocks-auth/`,
  },
};
