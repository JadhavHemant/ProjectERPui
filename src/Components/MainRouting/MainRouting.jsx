
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '../AdminSite/NavigationBar/NavigationBar';
import LoginCommon from '../LoginPage/LoginCommon';
import LoginPage from '../LoginPage/LoginPage';
import Sell from '../AdminSite/HomePage/Sell/Sell';
import HomePage from '../AdminSite/HomePage/HomePage';
import Users from '../AdminSite/HomePage/Users/Users';

const MainRouting = () => {
   return (
      <div>
         <Router>
            <Routes>
               <Route path='login' element={<LoginCommon />}>
                  <Route path='' element={<LoginPage />} />
               </Route>
               <Route path='Admin' element={<Navigation />}>
                  <Route path='' element={< HomePage/>} />
                  <Route path='users' element={< Users/>} />
                  <Route path='sell' element={< Sell/>} />
               </Route>
            </Routes>
         </Router>
      </div>
   )
}

export default MainRouting
