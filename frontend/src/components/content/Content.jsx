import React from "react";
import Feed from "../feed/Feed";
import Blogs from '../learn/blogs/Blogs';
import Tutorials from '../learn/tutorials/Tutorials';
import ProblemSheet from '../practice/problemSheets/ProblemSheet';
import Contests from '../practice/contests/Contests';
import Problems from '../practice/problems/Problems';
import CompanyWise from '../practice/companyWise/CompanyWise';
import Visualizer from '../visualizer/Visualizer';
import Discuss from '../discuss/Discuss';
import CreatePost from "../post/CreatePost";
import Account from '../account/Account';
import Profile from '../profile/Profile';
import AboutUs from '../about/AboutUs';
import Report from '../bug/Report';
const Content = (props) => {
  return (
    <>
      <div className="col-md-6 gedf-main">
        {props.content === "feed" && <Feed user={props.user} />}
        {props.content==="blogs" && <Blogs />}
        {props.content==="tutorials" && <Tutorials />}
        {props.content==="problems" && <Problems />}
        {props.content==="contests" && <Contests />}
        {props.content==="companyWiseProblems" && <CompanyWise />}
        {props.content==="problemSheets" && <ProblemSheet />}
        {props.content === "visualizer" && <Visualizer />}
        {props.content==="discuss" && <Discuss />}
        {props.content==="account" && <Account />}
        {props.content==="profile" && <Profile />}
        {props.content==="reportBug" && <Report />}
        {props.content==="aboutUs" && <AboutUs />}
      </div>
    </>
  );
};

export default Content;
