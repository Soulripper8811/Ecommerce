import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store.js";

// auth
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

//private routes
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/User/Profile.jsx";

// admin routes
import UserList from "./pages/Admin/UserList.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      {/* <Route path="/admin" element={<AdminRoute />}> */}
      <Route path="admin/userlist" element={<UserList />} />
      <Route path="admin/categorylist" element={<CategoryList />} />
      <Route path="admin/productlist" element={<ProductList />} />
      <Route path="admin/allproductslist" element={<AllProducts />} />
      <Route path="admin/product/update/:id" element={<ProductUpdate />} />
      {/* </Route> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
