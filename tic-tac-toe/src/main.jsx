import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "nes.css/css/nes.min.css";

import MenuPage from "./pages/MenuPage";
import HistoryPage from "./pages/HistoryPage";
import PlayPage from "./pages/PlayPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPage />,
    errorElement: <div className="font-primaryRegular">404 Not Found</div>,
  },
  {
    path: "/history",
    element: <HistoryPage />,
    errorElement: <div className="font-primaryRegular">404 Not Found</div>,
  },
  {
    path: "/play",
    element: <PlayPage />,
    errorElement: <div className="font-primaryRegular">404 Not Found</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
