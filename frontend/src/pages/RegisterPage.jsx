import React from 'react';
import Register from '../components/register/Register';
const RegisterPage = (props) => {
  return (
    <>
        <Register
                user={props.user}
                usertype={props.usertype}
                setuser={props.handleUser}
                setusertype={props.handleUserType}
              />
    </>
  )
}

export default RegisterPage