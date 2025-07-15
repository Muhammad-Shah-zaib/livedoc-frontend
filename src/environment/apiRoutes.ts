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
  },
  DOCUMENTS: {
    GET: `${BASE_API_URL}/documents/`,
    GET_BY_ID: (id: number) => `${BASE_API_URL}/documents/${id}/`,
    POST: `${BASE_API_URL}/documents/`,
  },
};
