import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { AdminDashboard } from "./pages/AdminDashboard";
import { RestaurantList } from "./pages/RestaurantList";
import { RestaurantDetails } from "./pages/RestaurantDetails";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { MyReviews } from "./pages/MyReviews";
import { AddRestaurant } from "./pages/AddRestaurant";
import { DesignSystem } from "./pages/DesignSystem";
import { ChatRecommendations } from "./pages/ChatRecommendations";
import { ColorSystem } from "./pages/ColorSystem";
import { NotFound } from "./pages/NotFound";
import { Favourites } from "./pages/Favourites";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "admin", Component: AdminDashboard },
      { path: "restaurants", Component: RestaurantList },
      { path: "restaurants/:id", Component: RestaurantDetails },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "profile", Component: Profile },
      { path: "my-reviews", Component: MyReviews },
      { path: "favorites", Component: Favourites },
      { path: "add-restaurant", Component: AddRestaurant },
      { path: "design", Component: DesignSystem },
      { path: "chat", Component: ChatRecommendations },
      { path: "colors", Component: ColorSystem },
      { path: "*", Component: NotFound },
    ],
  },
]);
