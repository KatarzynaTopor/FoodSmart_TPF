import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { AddRestaurant } from "./pages/AddRestaurant";
import { DesignSystem } from "./pages/DesignSystem";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "add-restaurant", Component: AddRestaurant },
      { path: "design", Component: DesignSystem },
    ],
  },
]);
