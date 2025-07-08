import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "magnific-popup/dist/magnific-popup.css";
import "font-awesome/css/font-awesome.min.css";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// DO NOT import bootstrap.bundle.min.js here anymore
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="489582703563-67onro2iigu746nkdl4igg7abk3pgvc4.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
