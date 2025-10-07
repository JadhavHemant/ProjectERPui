import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../AdminSite/NavigationBar/NavigationBar";
import LoginCommon from "../LoginPage/LoginCommon";
import LoginPage from "../LoginPage/LoginPage";
import Sell from "../AdminSite/HomePage/Sell/Sell";
import HomePage from "../AdminSite/HomePage/HomePage";
import Users from "../AdminSite/HomePage/Users/Users";
import PrivateRoute from "../PrivateRoute/PrivateRoute"; 

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
            <Route path="sell" element={<Sell />} />
          </Route>
        </Route>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default MainRouting;
