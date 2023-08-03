import React from "react";
import Register from "../components/register/Register";
const RegisterPage = (props) => {
  return (
    <>
      <Register user={props.user} />
    </>
  );
};

export default RegisterPage;
