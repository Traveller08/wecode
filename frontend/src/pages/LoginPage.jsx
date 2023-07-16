import React from "react";
import Login from "../components/login/Login";

const LoginPage = (props) => {
  return (
    <>
      <Login
        user={props.user}
        usertype={props.usertype}
        setuser={props.handleUser}
        setusertype={props.handleUserType}
      />
    </>
  );
};

export default LoginPage;
