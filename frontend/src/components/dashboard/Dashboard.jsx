import React, { useState, useEffect } from "react";

import "./index.css";
import Example from "../chart/Chart";
import apiService from "../../services/apiService.js";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("John");
  const [holdingsData, setHoldingsData] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [chartData, setChartData] = useState([]);
  const [symbolsList, setSymbolsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiService.getProfile(
          Cookies.get("token"),
          Cookies.get("user")
        );
        setName(response.data.user_name);
      } catch (error) {
        console.log("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  const fetchData = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.getHistoricalData(
        Cookies.get("token"),
        symbol,
        fromDate,
        toDate
      );
      if (response && response.data) {
        const data = response.data.map((entry) => {
          return {
            date: entry.date.slice(0, entry.date.indexOf("T")),
            symbol: entry.price,
          };
        });
        setChartData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSymbols = async () => {
    try {
      const response = await apiService.getSymbols(Cookies.get("token"));
      if (response) {
        setSymbolsList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };
  const handleProfile = () =>{
    navigate('/profile');
  }
  const handleHome = () =>{
    navigate('/');
  }
  const handleLogout = (e) => {
    // e.preventDefault();
    if (Cookies.get("token")) {
      Cookies.remove("token");
    }
    if (Cookies.get("user")) {
      Cookies.remove("user");
    }
    alert("Logout successfull");
    window.location.href = "/";
    // navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <span className="dashboard-navbar-greeting" onClick={handleHome}>Hello, {name}</span>
        <ul className="dashboard-navbar-links">
          <li className="dashboard-navbar-link" onClick={handleProfile}>My Profile</li>
          <li className="dashboard-navbar-link">Place an Order</li>
          <li className="dashboard-navbar-link" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>

      <p className="dashboard-heading">Dashboard</p>

      <div className="dashboard-card">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {holdingsData.map((holding, index) => (
              <tr key={index}>
                <td>{holding.symbol}</td>
                <td>{holding.price}</td>
                <td>{holding.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-card">
        <form className="dashboard-form">
          <label className="dashboard-form-label">Symbol:</label>
          <select
            className="dashboard-form-input chart-select"
            value={symbol}
            onClick={fetchSymbols}
            onChange={handleSymbolChange}
          >
            <option value="" className="dashboard-form-option">
              Select a symbol
            </option>
            {symbolsList.map((symbol, index) => (
              <option
                key={index}
                className="dashboard-form-option"
                value={symbol.instrument_name}
              >
                {symbol.instrument_name}
              </option>
            ))}
          </select>

          <label className="dashboard-form-label">From Date:</label>
          <input
            className="dashboard-form-input"
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
          />
          <label className="dashboard-form-label">To Date:</label>
          <input
            className="dashboard-form-input"
            type="date"
            value={toDate}
            onChange={handleToDateChange}
          />
          <button
            className="dashboard-form-button"
            type="submit"
            onClick={fetchData}
          >
            Fetch Data
          </button>
        </form>
      </div>
      <div className="dashboard-card">
        <div className="dashboard-chart">
          <Example data={chartData} symbol={symbol} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
