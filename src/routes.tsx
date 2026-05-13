import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { AddRestaurant } from "./pages/AddRestaurant";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "add-restaurant", Component: AddRestaurant },
    ],
  },
]);
