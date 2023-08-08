import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import apiService from "../../services/apiService";
import "./index.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import FormNavBar from "../navbar/FormNavbar";
import toast from "react-hot-toast";

const successNotify = (message) => toast.success(message);
const errorNotify = (message) => toast.error(message);

function Register(props) {
  const [userdetails, setUserdetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    codeforcesHandle: "",
  });

  const [confirmpassword, setConfirmpassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [waiting, setWaiting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserdetails({ ...userdetails, [name]: value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmpassword(e.target.value);
    if (e.target.value !== userdetails.password) {
      setPasswordMessage("passwords don't match");
    } else {
      setPasswordMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    try {
      const response = await apiService.register(userdetails);
      successNotify(response.message);
      window.location.href = "/login";
      console.log(response);
    } catch (error) {
      errorNotify("Failed to register");
      console.error("Error message:", error);
    } finally {
      setWaiting(false);
      setUserdetails({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        codeforcesHandle: "",
      });
      setConfirmpassword("");
    }
  };

  return (
    <>
      <FormNavBar />
      <div className="form-container">
        <div className="form-group row header-container">
          <h2>Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm">
              <input
                type="email"
                className="form-control"
                id="inputEmail3"
                name="username"
                required={true}
                onChange={handleInputChange}
                value={userdetails.username}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm">
              <input
                type="password"
                className="form-control"
                name="password"
                required={true}
                onChange={handleInputChange}
                value={userdetails.password}
                id="inputPassword3"
                placeholder="Password"
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </Form.Text>
            </div>
          </div>

          <div className="form-group row">
            <label for="inputPassword4" className="col-sm-2 col-form-label">
              Confirm Password
            </label>
            <div className="col-sm">
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                onChange={handleConfirmPasswordChange}
                value={confirmpassword}
                required={true}
                id="inputPassword4"
                placeholder="confirm password"
              />
              <Form.Text
                style={{ color: `${passwordMessage !== "" ? "red" : "black"}` }}
                id="confirm-pass-text"
              >
                {passwordMessage}
              </Form.Text>
            </div>
          </div>

          <div className="form-group row">
            <label for="inputPassword4" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm">
              <input
                type="text"
                name="firstName"
                required={true}
                onChange={handleInputChange}
                value={userdetails.firstName}
                className="form-control"
                placeholder="First name"
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                onChange={handleInputChange}
                value={userdetails.lastName}
                placeholder="Last name"
                name="lastName"
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputPassword4" className="col-sm-2 col-form-label">
              Codeforces handle
            </label>
            <div className="col-sm">
              <input
                type="text"
                required={true}
                className="form-control"
                name="codeforcesHandle"
                onChange={handleInputChange}
                value={userdetails.codeforcesHandle}
                placeholder="codeforces handle"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm btn-container">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  confirmpassword === "" ||
                  confirmpassword !== userdetails.password
                }
              >
                {waiting && (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {waiting ? "please wait..." : "Register"}
              </button>
            </div>
            <div className="form-group row">
              <div className="col-sum">
                <Form.Text>
                  Already have an account? <Link to="/login">Login here</Link>
                </Form.Text>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
