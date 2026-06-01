import { createBrowserRouter, Navigate } from "react-router-dom";
import FluidCodePitch from "../pages/FluidCodePitch";

export const router = createBrowserRouter([
  { path: "/", element: <FluidCodePitch /> },
  { path: "/000000", element: <FluidCodePitch /> },
  { path: "/token/:token", element: <FluidCodePitch /> },
  { path: "*", element: <Navigate to="/" replace /> }
]);
