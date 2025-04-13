import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("❌ Missing Clerk Publishable Key. Set VITE_CLERK_PUBLISHABLE_KEY in .env");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider
  publishableKey={PUBLISHABLE_KEY}
  signInUrl="/signin"
  signUpUrl="/signup"
  signInFallbackRedirectUrl="/dashboard" // ✅ Forces redirect after sign-in or sign-up
  signUpFallbackRedirectUrl={"/dashborad"}
>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ClerkProvider>
);
