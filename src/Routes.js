import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AdminContextProvider from "./contexts/AdminContext";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import AdminPage from "./pages/AdminPage";
import UserContextProvider from "./contexts/UserContext";
import MainPage from "./pages/MainPage";
import DetailsPage from "./pages/DetailsPage";
import CartPage from "./pages/CartPage";
import AuthContextProvider from "./contexts/AuthContext";
import OrderPage from "./pages/OrderPage";

const MyRoutes = () => {
  return (
    <AuthContextProvider>

    <UserContextProvider>
      <AdminContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add" element={<AddPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin/edit/:id" element={<EditPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/cart/order" element={<OrderPage/>}/>
          </Routes>
        </BrowserRouter>
      </AdminContextProvider>
    </UserContextProvider>
    </AuthContextProvider>
  );
};

export default MyRoutes;
