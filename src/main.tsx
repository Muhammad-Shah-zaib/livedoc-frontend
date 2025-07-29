import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App.tsx";
import { persistor, store } from "./store/store.ts";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

const clientId = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </GoogleOAuthProvider>
  </ReduxProvider>
);
