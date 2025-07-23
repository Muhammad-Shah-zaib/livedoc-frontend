import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import { Toaster } from "sonner";
import { StrictMode } from "react";

const clientId = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ReduxProvider>
  </StrictMode>
);
