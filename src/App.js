import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginHome from "./components/LoginHome";
import ManagerHome from "./components/Manager/Home";
import TeamMemberHome from "./components/TeamMate/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginHome />}></Route>
        <Route path="/manager/home" element={<ManagerHome />}></Route>
        <Route path="/teammember/home" element={<TeamMemberHome />}></Route>
      </Routes>
    </Router>
  );
}

// (node:9732) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
// (Use `node --trace-deprecation ...` to show where the warning was created)
// (node:9732) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please
// use the 'setupMiddlewares' option.
