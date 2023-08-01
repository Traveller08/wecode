import React, { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ProfilePhotoCard from "./ProfilePhotoCard";

const successNotify=(message) =>toast.success(message);
const errorNotify = (message) => toast.error(message);
const Profile = ({ user, onSave }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  var photourl = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp";
  if (user.photourl){
    photourl=user.photourl;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    // Here you can implement the logic to save the editedUser data to the database
    setIsEditMode(false);
    // Assuming you have an onSave function passed as a prop to handle data save
    onSave(editedUser);
  };
  const deleteProfilePhoto=async(e)=>{

  }
  const updateProfilePhoto = async(e)=>{

  }
  return (
    <div className="profile">
      <div className="profile-picture">
        
        <ProfilePhotoCard profilePhotoUrl={photourl} onDelete={deleteProfilePhoto} onUpdate={updateProfilePhoto}/>
      </div>
     
        <>
          <input
            type="text"
            name="firstName"
            value={editedUser.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            value={editedUser.lastName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="codeforcesHandle"
            value={editedUser.codeforcesHandle}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
        </>

    </div>
  );
};

export default Profile;
