import React, { useEffect, useState } from "react";
import Profile from "../components/profile/Profile";
import apiService from "../services/apiService";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const successNotify = (message) => toast.success(message);
const errorNotify = (message) => toast.error(message);

const ProfilePage = (props) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    // Fetch user details from your API service and update the state
    const fetchUserDetails = async () => {
      try {
        const response = await apiService.getUserDetails();
        console.log("response at profile ", response.data[0]);
        setUser(response.data[0]);
      } catch (error) {
        console.error("Error message:", error);
      }
      console.log("user info : ", user);
    };
    fetchUserDetails();
  }, []);

  const handleSaveProfile = (editedUser) => {
    // Implement the logic to save the editedUser data to the database
    apiService.updateUserDetails(editedUser).then((response) => {
      // Assuming the API call is successful, update the user state with the new data
      setUser(response.data);
    });
  };
  return (
    <>
      <div className="col-md-3"></div>
      <div className="col-md-6 gedf-main">
        <Profile user={user} onSave={handleSaveProfile} />
      </div>
      <div className="col-md-3"></div>
    </>
  );
};

export default ProfilePage;
