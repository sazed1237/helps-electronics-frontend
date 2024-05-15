import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login/Login";
import SingUp from "../pages/SingUp/SingUp";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import AdminPanel from "../pages/Admin/AdminPanel";
import AllUsers from "../pages/Admin/AllUsers/AllUsers";
import AddProduct from "../pages/Admin/AddProduct/AddProduct";
import ManageProduct from "../pages/Admin/ManageProduct/ManageProduct";
import CategoryProduct from "../pages/CategoryProduct/CategoryProduct";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Search from "../pages/Search/Search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/singup',
        element: <SingUp></SingUp>
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword></ForgotPassword>
      },
      {
        path: '/category-product',
        element: <CategoryProduct></CategoryProduct>
      },
      {
        path: '/product-details/:id',
        element: <ProductDetails></ProductDetails>
      },
      {
        path: '/cart',
        element: <Cart></Cart>
      },
      {
        path: 'search',
        element: <Search></Search>
      },


      // admin only route
      {
        path: '/admin-panel',
        element: <AdminPanel></AdminPanel>,
        children: [
          {
            path: 'all-users',
            element: <AllUsers></AllUsers>
          },
          {
            path: 'add-product',
            element: <AddProduct></AddProduct>
          },
          {
            path: 'manage-product',
            element: <ManageProduct></ManageProduct>
          }
        ]
      }
    ],
  },
]);
