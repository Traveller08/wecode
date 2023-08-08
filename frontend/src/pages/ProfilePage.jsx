import React, { useEffect, useState } from "react";
import Profile from "../components/profile/Profile";
import apiService from "../services/apiService";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const successNotify = (message) => toast.success(message);
const errorNotify = (message) => toast.error(message);

const ProfilePage = (props) => {
  
  return (
    <>
      {/* <div className="col-md-3"></div> */}
      {/* <div className="col-md-6 gedf-main">  */}
        <Profile />
      {/* </div> */}
      {/* <div className="col-md-3"></div> */}
    </>
  );
};

export default ProfilePage;
