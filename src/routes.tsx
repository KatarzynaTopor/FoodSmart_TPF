import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { MyReviews } from "./pages/MyReviews";
import { AddRestaurant } from "./pages/AddRestaurant";
import { DesignSystem } from "./pages/DesignSystem";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "profile", Component: Profile },
      { path: "my-reviews", Component: MyReviews },
      { path: "add-restaurant", Component: AddRestaurant },
      { path: "design", Component: DesignSystem },
    ],
  },
]);
