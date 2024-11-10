// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import { CartProvider } from "./CartContext";
import Cart from "./Cart";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
      errorElement: <div>404 Error</div>,
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
      v7_relativeSplatRoutes: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
    },
  }
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <Cart />
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </CartProvider>
  </StrictMode>
);
