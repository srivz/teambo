import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginTeam from "./components/LoginPages/LoginTeam";
import TeamMateHome from "./components/TeamMate/Home";
import SignUp from "./components/LoginPages/SignUp";
import ManagerHome from "./components/Manager/Home";
import LoginHome from "./components/LoginHome";
import SignUpResponse from "./components/LoginPages/SignUpResponse";
import ForgotPassword from "./components/LoginPages/ForgotPassword";

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
          path="/manager/home"
          element={<ManagerHome />}></Route>
        <Route
          path="/teamMate/home"
          element={<TeamMateHome />}></Route>
      </Routes>
    </Router>
  );
}

// (node:9732) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
// (Use `node --trace-deprecation ...` to show where the warning was created)
// (node:9732) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please
// use the 'setupMiddlewares' option.
