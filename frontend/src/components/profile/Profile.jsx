import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ProfilePhotoCard from "./ProfilePhotoCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import apiService from "../../services/apiService";
import Container from "react-bootstrap/Container";
const successNotify = (message) => toast.success(message);
const errorNotify = (message) => toast.error(message);

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    // Fetch user details from your API service and update the state
    const fetchUserDetails = async () => {
      try {
        const response = await apiService.getUserDetails();
        console.log("response at profile ", response.data);
        setUser(response.data);
      } catch (error) {
        errorNotify("Error fetching profile data");
        console.error("Error message:", error);
      }
      console.log("user info : ", user);
    };
    fetchUserDetails();
  }, []);

  const handleSaveProfile = (user) => {
    // Implement the logic to save the editedUser data to the database
    apiService.updateUserDetails(user).then((response) => {
      // Assuming the API call is successful, update the user state with the new data
      successNotify("details updated successfully");
      setUser(response.data);
    });
  };

  // console.log("user in profile component -> ", user, "edited ",editedUser);
  // var photourl = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp";
  var photourl = require("../../images/user.png");
  if (user.photourl) {
    photourl = user.photourl;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const style_profile = {
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
    marginBottom: "10px",
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(isEditMode ^ true);
    const fetchUserDetails = async () => {
      try {
        const response = await apiService.getUserDetails();
        console.log("response at profile ", response.data);
        setUser(response.data);
      } catch (error) {
        errorNotify("Error fetching profile data");
        console.error("Error message:", error);
      }
      console.log("user info : ", user);
    };
    fetchUserDetails();
  };

  const handleSave = () => {
    // Here you can implement the logic to save the editedUser data to the database
    setIsEditMode(false);
    // Assuming you have an onSave function passed as a prop to handle data save
    handleSaveProfile(user);

    Cookies.set("name", user.firstName + " " + user.lastName, { expires: 1 });
    Cookies.set("cfHandle", user.codeforcesHandle, { expires: 1 });
  };

  const deleteProfilePhoto = async (e) => {};
  const updateProfilePhoto = async (e) => {};
  return (
    <Container>
      <div className="profile">
        <div className="profile-picture">
          <ProfilePhotoCard
            profilePhotoUrl={photourl}
            onDelete={deleteProfilePhoto}
            onUpdate={updateProfilePhoto}
          />
        </div>

        <Form className="profile-data">
          <Form.Group style={style_profile}>
            <Form.Label>First Name:</Form.Label>
            {isEditMode ? (
              <>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  disabled
                  readOnly
                />
              </>
            )}
          </Form.Group>
          <Form.Group style={style_profile}>
            <Form.Label>Last Name:</Form.Label>
            {isEditMode ? (
              <>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  disabled
                  readOnly
                />
              </>
            )}
          </Form.Group>
          <Form.Group style={style_profile}>
            <Form.Label>Handle:</Form.Label>
            {isEditMode ? (
              <>
                <Form.Control
                  type="text"
                  name="codeforcesHandle"
                  value={user.codeforcesHandle}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <Form.Control
                  type="text"
                  name="codeforcesHandle"
                  value={user.codeforcesHandle}
                  onChange={handleChange}
                  disabled
                  readOnly
                />
              </>
            )}
          </Form.Group>
          <Form.Group>
            {/* <Form.Label></Form.Label> */}
            {isEditMode ? (
              <>
                <Button onClick={handleSave} style={{ marginLeft: "17%" }}>
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="danger"
                  style={{ marginLeft: "20px" }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleEdit} style={{ marginLeft: "17%" }}>
                  Edit Details
                </Button>
              </>
            )}
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default Profile;
