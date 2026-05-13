import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { AdminDashboard } from "./pages/AdminDashboard";
import { RestaurantList } from "./pages/RestaurantList";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "admin", Component: AdminDashboard },
      { path: "restaurants", Component: RestaurantList },
    ],
  },
]);
