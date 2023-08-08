import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import HomePageCarousel from "../carousel/HomePageCarousel";
import NavBar from "../navbar/NavBar";
import LeftSideBar from "../sidebar/LeftSideBar";
import RightSideBar from "../sidebar/RightSideBar";
import Content from "../content/Content";
import WeCodeFooter from "../footer/WeCodeFooter";
const Dashboard = (props) => {
  useEffect(() => {
    console.log("props ", props);
  }, []);
  return (
    <>
      <NavBar
        user={props.user}
        setuser={props.setuser}
        url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
      />
      <div className="container">
        <HomePageCarousel />
        {/* <div>
          
          <h1>InvestTrack</h1>
          <p>Track and manage your investments with ease.</p>
          <p>InvestTrack helps you stay on top of your portfolio, monitor market trends, and make informed investment decisions.</p>
          
          <div className="cta-buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        </div> */}
        <div className="row mt-2">
          <LeftSideBar />
          <Content />
          <RightSideBar />
        </div>
      </div>
      <WeCodeFooter />
    </>
  );
};

export default Dashboard;
