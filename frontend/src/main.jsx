import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "@asgardeo/auth-react";
import { CartProvider } from "./components/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
<AuthProvider
  config={{
    signInRedirectURL: "http://localhost:5173",
    signOutRedirectURL: "http://localhost:5173",
    clientID: "QL0JjlKkGScLTDdrv9fCSf5nwPMa",
    baseUrl: "https://api.asgardeo.io/t/thanoo",
    scope: ["openid", "profile"],
    endpoints: {
      authorizationEndpoint:
        "https://api.asgardeo.io/t/thanoo/oauth2/authorize",
      tokenEndpoint:
        "https://api.asgardeo.io/t/thanoo/oauth2/token",
      userinfoEndpoint:
        "https://api.asgardeo.io/t/thanoo/oauth2/userinfo",
      jwksEndpoint:
        "https://api.asgardeo.io/t/thanoo/oauth2/jwks",
      logoutEndpoint:
        "https://api.asgardeo.io/t/thanoo/oidc/logout",
    },
  }}
>
      <CartProvider>
        <App/>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
