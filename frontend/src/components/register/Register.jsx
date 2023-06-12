import React, { useState } from "react";
import apiService from "../../services/apiService";
import "./index.css";
import { Link } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleFirstNameChange = (e) => {
    setError('');
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setError('');
    setLastName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setError('');
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setError('');
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.register(firstName,lastName,username,password);
      setError(response.message);
    } catch (error) {
      setError("user with given username already exists or server error")
      console.error("Error message:", error);
    }finally{
      setFirstName('');
      setLastName('');
      setPassword('');
      setUsername('');
      // setError('');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
