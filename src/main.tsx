import { captureOwnerStack, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { onConsoleError } from "./utils/errorOverlay.ts";

if (process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error;

  console.error = function patchedConsoleError(...args) {
    originalConsoleError.apply(console, args);
    const ownerStack = captureOwnerStack();
    onConsoleError({
      consoleMessage: args[0],
      ownerStack,
    });
  };
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
