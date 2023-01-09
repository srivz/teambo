import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginTeam from "./components/LoginPages/LoginTeam";
import TeamMateHome from "./components/TeamMate/Home";
import SignUp from "./components/LoginPages/SignUp";
import LoginHome from "./components/LoginPages/LoginHome";
import SignUpResponse from "./components/LoginPages/SignUpResponse";
import ForgotPassword from "./components/LoginPages/ForgotPassword";
import Analytics from "./components/Manager/Analytics";
import HomeBlock from "./components/Manager/HomeBlock";
import HomeList from "./components/Manager/HomeList";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginTeam />}></Route>
          <Route
          path="/signup/select"
          element={<LoginHome />}></Route>
        <Route
          path="/forgotPassword"
          element={<ForgotPassword />}></Route>
        <Route
          path="/teamMate/login"
          element={
            <LoginTeam
              text="Working"
              user="teamMate"
            />
          }></Route>
        <Route
          path="/manager/login"
          element={
            <LoginTeam
              text="Assigning"
              user="manager"
            />
          }></Route>
        <Route
          path="/signUp/manager"
          element={<SignUp userid="manager"/>}></Route>
        <Route
          path="/signUp/teammate"
          element={<SignUp userid="teammate"/>}></Route>
        <Route
          path="/signUp/response"
          element={<SignUpResponse />}></Route>
        <Route
          path="/manager/home/list"
          element={<HomeList />}></Route>
        <Route
          path="/manager/analytics"
          element={<Analytics />}></Route>
        <Route
          path="/teamMate/home"
          element={<TeamMateHome />}></Route>
        <Route
          path="/manager/home/block"
          element={<HomeBlock />}></Route>
      </Routes>
    </Router>
  );
}

// (node:9732) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
// (Use `node --trace-deprecation ...` to show where the warning was created)
// (node:9732) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please
// use the 'setupMiddlewares' option.
