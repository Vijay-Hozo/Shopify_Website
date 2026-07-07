import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

// entry point of react application
createRoot(document.getElementById("root")).render(
  // Wrapping store to all components
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
