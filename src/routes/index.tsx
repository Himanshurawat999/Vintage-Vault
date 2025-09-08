import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../features/products/HomePage";
import ProductDetails from "../features/products/ProductDetails";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import CartPage from "../features/cart/CartPage";
import OrdersPage from "../features/orders/OrdersPage";
import ForgetPassword from "../features/auth/ForgetPassword";
import ResetPassword from "../features/auth/ResetPassword";
import Products from "../features/products/Products";
import UserProfile from "../features/users/UserProfile";
import { Shipping } from "../features/shipping/Shipping";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forget", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "profile", element: <UserProfile /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "cart", element: <CartPage /> },
      {path: "shipping", element: <Shipping />},
      { path: "orders", element: <OrdersPage /> },
    ],
  },
]);
