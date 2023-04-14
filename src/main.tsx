import React from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
