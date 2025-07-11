const BASE_API_URL = import.meta.env.VITE_API_BASE_URL

export const API_ROUTES = {
    AUTH: {
        login: `${BASE_API_URL}/login/`,
        logout: `${BASE_API_URL}/logout/`,
        register: `${BASE_API_URL}/register/`,
        googleLogin: `${BASE_API_URL}/login/google/`,
    }
}