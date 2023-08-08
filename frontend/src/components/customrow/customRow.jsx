import React from "react";
import "./customRow.css";

const CustomRow = ({ title, linkArray }) => {
  return (
    <div className="custom-row">
      <div className="custom-row-header">{title}</div>
      <div className="custom-row-posters">
        {linkArray.map((link) => (
          <div className="custom-row-poster" key={link.id}>
            <iframe
              src={link.src}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomRow;
