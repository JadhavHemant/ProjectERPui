import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../AdminSite/NavigationBar/NavigationBar";
import LoginCommon from "../LoginPage/LoginCommon";
import LoginPage from "../LoginPage/LoginPage";
import Sell from "../AdminSite/HomePage/Sell/Sell";
import HomePage from "../AdminSite/HomePage/HomePage";
import Users from "../AdminSite/HomePage/Users/Users";
import PrivateRoute from "../PrivateRoute/PrivateRoute"; 
import CompanyManagement from "../AdminSite/HomePage/Company/CompanyManagement";
import ProductCategeory from "../AdminSite/HomePage/ProductCategeory/ProductCategeory";
import Products from "../AdminSite/HomePage/Products/Products";
import Reports from "../AdminSite/HomePage/Reports/Reports";

const MainRouting = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginCommon />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<Navigation />}>
            <Route index element={<HomePage />} />
            <Route path="users" element={<Users />} />
             <Route path="reports" element={<Reports />} />
            <Route path="Sales" element={<Sell />} />
            <Route path="company" element={<CompanyManagement />} />
            <Route path="category" element={<ProductCategeory />} />
            <Route path="Product" element={<Products />} />
          </Route>
        </Route>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default MainRouting;


