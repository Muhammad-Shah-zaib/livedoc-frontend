const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_API_URL}/login/`,
    LOGOUT: `${BASE_API_URL}/logout/`,
    REGISTER: `${BASE_API_URL}/register/`,
    GOOGLE_LOGIN: `${BASE_API_URL}/login/google/`,
    FORGOT_PASSWORD: `${BASE_API_URL}/forgot-password/`,
    RESET_PASSWORD: `${BASE_API_URL}/reset-password`,
    GET_USER_PROFILE: `${BASE_API_URL}/user/get-profile/`,
    GET_USER_BY_EMAIL: `${BASE_API_URL}/user/by-email`,
  },
  DOCUMENTS: {
    GET_POST: `${BASE_API_URL}/documents/`,
    PATCH_PUT_DETAIL: (id: number) => `${BASE_API_URL}/documents/${id}/`,
    GET_DETAIL_BY_SHARE_TOKEN: (share_token: string) => {
      return `${BASE_API_URL}/documents/by-token/${share_token}/`;
    },
    CHECK_LIVE_ACCESS: (share_token: string) =>
      `${BASE_API_URL}/documents/${share_token}/can-connect`,
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
};
