import React, { useState } from "react";
import "./ProfilePhotoCard.css";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ProfilePhotoCard = ({ profilePhotoUrl, onDelete, onUpdate }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateProfileImage = () => {
    if (selectedImage) {
      onUpdate(selectedImage);
    }
  };

  return (
    <div className="profile-photo-card">
      <div className="profile-photo">
        <img
          src={profilePhotoUrl}
          alt="Profile"
          className="rounded-circle"
          width="150"
          height="150"
        />
      </div>
      {/* <div className="buttons-container">
        <div className="image-selector">
          <InputGroup>
            <Form.Control
              type="file"
              onChange={handleImageChange}
              className="img-input"
            ></Form.Control>
            <Button
              variant="outline-primary"
              onClick={handleUpdateProfileImage}
            >
              update
            </Button>
            <Button variant="outline-danger" onClick={onDelete}>
              delete
            </Button>
          </InputGroup>
        </div>
      </div> */}
    </div>
  );
};

export default ProfilePhotoCard;
