import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';
import apiService from '../../services/apiService';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.login(username,password);
      const { token } = response;
      Cookies.set('token', token, { expires: 1/48 });
      Cookies.set('user', username, { expires: 1/48 });
      props.setUser(true);
      navigate('/');
    } catch (error) {
      setError('Invalid username or password');
    }finally{
      setUsername('');
      setPassword('');
    }
  };
  
  const handleUsernameChange = (e) => {
    setError('');
    setUsername(e.target.value);
  };
  const handlePasswordChange =(e) => {
    setError('');
    setPassword(e.target.value);
  }
  return (
    <div className="login-container">
    <h2>Login</h2>
    {error && <p className="error-message">{error}</p>}
    <form onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
    <p className="login-link">
        Don't have an account? <Link to="/register" className='navi-link'>Create New Account</Link>
      </p>
  </div>
    
  );
};

export default Login;
