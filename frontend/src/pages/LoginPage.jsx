import React from "react";
import Login from "../components/login/Login";

const LoginPage = (props) => {
  return (
    <>
      <Login
        user={props.user}
        usertype={props.usertype}
        setuser={props.setuser}
        setusertype={props.setusertype}
      />
    </>
  );
};

export default LoginPage;
