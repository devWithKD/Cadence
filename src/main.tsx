import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-tooltip/dist/react-tooltip.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./store/auth-context.tsx";
import ThemeContextProvider from "./store/theme-context.tsx";
import KanbanContextProvider from "./store/kanban-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <KanbanContextProvider>
        <ThemeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeContextProvider>
      </KanbanContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
