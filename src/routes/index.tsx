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
import OrderHistory from "../features/orders/OrderHistory";
import OrderItem from "../features/orders/OrderItem";
import AdminLayout from "../features/admin/AdminLayout";
import AdminOrder from "../features/admin/AdminOrder";
import AdminProduct from "../features/admin/AdminProduct";
import AdminCategory from "../features/admin/AdminCategory";
import ProtectedRoute from "./ProtectedRoute";
import Page404 from "../components/userComponent/Page404";
import { ScrollRestoration } from "react-router";
import WishList from "../features/wishlist/WishList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
        <ScrollRestoration
          getKey={(location) => {
            // Check if the current route is the homepage
            // if (location.pathname === "/") {
            //   window.scrollTo(0,0)
            //   return "home";
            // }

            // Restore based on pathname
            // return location.pathname;

            window.scrollTo(0, 0);

            // Restore based on a unique location key (default behavior)
            return location.key;
          }}
        />
      </>
    ),
    children: [
      // Pulic Route
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forget", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> },

      // Protected routes for users
      {
        path: "",
        element: <ProtectedRoute element={<HomePage />} isUserRoute={true} />,
      },
      {
        path: "/user-profile",
        element: <ProtectedRoute element={<UserProfile />} isUserRoute={true} />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute element={<UserProfile />} isUserRoute={true} />
        ),
      },
      {
        path: "products",
        element: <ProtectedRoute element={<Products />} isUserRoute={true} />,
      },
      {
        path: "products/:id",
        element: (
          <ProtectedRoute element={<ProductDetails />} isUserRoute={true} />
        ),
      },
      {
        path: "cart",
        element: <ProtectedRoute element={<CartPage />} isUserRoute={true} />,
      },
      {
        path: "wishlist",
        element: <ProtectedRoute element={<WishList />} isUserRoute={true} />,
      },
      {
        path: "shipping",
        element: <ProtectedRoute element={<Shipping />} isUserRoute={true} />,
      },
      {
        path: "orders",
        element: <ProtectedRoute element={<OrdersPage />} isUserRoute={true} />,
      },
      {
        path: "orders/:id",
        element: <ProtectedRoute element={<OrderItem />} isUserRoute={true} />,
      },
      {
        path: "orders-history",
        element: (
          <ProtectedRoute element={<OrderHistory />} isUserRoute={true} />
        ),
      },

      //Protect routes for Admin
      {
        path: "admin",
        element: (
          <ProtectedRoute element={<AdminLayout />} isAdminRequired={true} />
        ),
        children: [
          { index: true, element: <AdminOrder /> },
          { path: "orders", element: <AdminOrder /> },
          { path: "products", element: <AdminProduct /> },
          { path: "category", element: <AdminCategory /> },
        ],
      },

      { path: "*", element: <Page404 /> },
    ],
  },
]);
