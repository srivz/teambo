import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginHome from "./components/LoginHome";
import LoginTeam from "./components/LoginPages/LoginTeam";
import TeamMemberHome from "./components/TeamMate/Home";
import SignUp from "./components/LoginPages/SignUp";
import HomeList from "./components/Manager/HomeList";
import HomeBlock from "./components/Manager/HomeBlock";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginHome />}></Route>
        <Route
          path="/teammate/login"
          element={<LoginTeam text="Working" />}></Route>
        <Route
          path="/manager/login"
          element={<LoginTeam text="Assigning" />}></Route>
        <Route
          path="/signup"
          element={<SignUp />}></Route>
        <Route
          path="/manager/home/listView"
          element={<HomeList />}></Route>
        <Route
          path="/manager/home/gridView"
          element={<HomeBlock />}></Route>
        <Route
          path="/teammember/home"
          element={<TeamMemberHome />}></Route>
      </Routes>
    </Router>
  );
}

// (node:9732) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
// (Use `node --trace-deprecation ...` to show where the warning was created)
// (node:9732) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please
// use the 'setupMiddlewares' option.
