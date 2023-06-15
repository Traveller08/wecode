import React, { useState } from "react";
import HomePageCarousel from "../carousel/HomePageCarousel";
import NavBar from "../navbar/NavBar";
import LeftSideBar from "../sidebar/LeftSideBar";
import RightSideBar from "../sidebar/RightSideBar";
import Content from "../content/Content";
import WeCodeFooter from "../footer/WeCodeFooter";
// import './index.css';
function HomePage(props) {
  const [leftContent, setLeftContent] = useState("");
  const [rightContent, setRightContent] = useState("");
  const [mainContent, setMainContent] = useState("feed");
  return (
    <>
      <NavBar user={props.user} 
      usertype={props.usertype} 
      setuser={props.setuser} 
      setusertype={props.setusertype} 
      leftcontent={leftContent}
      rightcontent={rightContent}
      maincontent = {mainContent}
      setleftcontent={setLeftContent}
      setrightcontent={setRightContent}
      setmaincontent={setMainContent}
      url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
      />
      <div className="container">
        {mainContent==="feed" && <HomePageCarousel />}
        <div  className="row mt-2">
          <LeftSideBar user={props.user} usertype={props.usertype} setuser={props.setuser} setusertype={props.setusertype} content={leftContent} setcontent={setLeftContent}/>
          <Content user={props.user} usertype={props.usertype} setuser={props.setuser} setusertype={props.setusertype} content={mainContent} setcontent={setMainContent} />
          <RightSideBar user={props.user} usertype={props.usertype} setuser={props.setuser} setusertype={props.setusertype} content={rightContent} setcontent={setRightContent} />
        </div>
      </div>
      <WeCodeFooter />
    </>
  );
}

export default HomePage;
