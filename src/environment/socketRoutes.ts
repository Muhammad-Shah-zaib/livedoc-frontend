const BASE_URL =
  import.meta.env.VITE_SOCKET_BASE_URL || "http://localhost:8000/ws";

export const SOCKET_ROUTES = {
  DOCUMENTS: {
    LIVE: (shareToken: string) => `${BASE_URL}/documents/${shareToken}/`,
  },
};
