import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";

const Layout = ({ component: Component, user, handleLogout, ...rest }) => {
  return (
    <>
      <Route {...rest} render={(props) => <Component {...props} />} />
    </>
  );
};

export default Layout;
