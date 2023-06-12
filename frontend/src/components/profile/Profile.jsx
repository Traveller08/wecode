import React, { useState, useEffect } from "react";

import "../dashboard/index.css";

import apiService from "../../services/apiService.js";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [name, setName] = useState("John");
    const [userId, setUserID] = useState("AB1234");
    const [userType, setUserType] = useState("individual");
    const [userEmail, setUserEmail] = useState("xxxyyy@gmail.com");
    const [userName, setUserName] = useState("AxAx Bxx");
    const [broker, setBroker] = useState("ZERODHA");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await apiService.getProfile(
                    Cookies.get("token"),
                    Cookies.get("user")
                );
                setName(response.data.user_name);
                setUserID(response.data.user_id);
                setUserType(response.data.user_type);
                setUserEmail(response.data.email);
                setUserName(response.data.user_name);
                setBroker(response.data.broker);
            } catch (error) {
                console.log("Error fetching profile data:", error);
            }
        };
        fetchProfileData();
    }, []);
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
                    <li className="dashboard-navbar-link" onClick={handleProfile}>
                        My Profile
                    </li>
                    <li className="dashboard-navbar-link">Place an Order</li>
                    <li className="dashboard-navbar-link" onClick={handleLogout}>
                        Logout
                    </li>
                </ul>
            </nav>

            <p className="dashboard-heading">My profile</p>
            <div className="profile-dashboard-card">
                <form class="profile-form">
                    <div class="form-group">
                        <label for="user-id">User ID</label>
                        <input type="text" id="user-id" value={userId} readonly />
                    </div>
                    <div class="form-group">
                        <label for="user-type">User Type</label>
                        <input type="text" id="user-type" value={userType} readonly />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" value={userEmail} readonly />
                    </div>
                    <div class="form-group">
                        <label for="user-name">User Name</label>
                        <input type="text" id="user-name" value={userName} readonly />
                    </div>
                    <div class="form-group">
                        <label for="broker">Broker</label>
                        <input type="text" id="broker" value={broker} readonly />
                    </div>
                   
                </form>


            </div>
        </div>
    );
};

export default Dashboard;
