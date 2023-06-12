import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function HomePage() {
  return (
    <div>
      <h1>InvestTrack</h1>
      <p>Track and manage your investments with ease.</p>
      <p>InvestTrack helps you stay on top of your portfolio, monitor market trends, and make informed investment decisions.</p>
      
      <div className="cta-buttons">
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </div>
    </div>
  );
}

export default HomePage;
