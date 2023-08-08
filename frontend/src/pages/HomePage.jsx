import React from "react";
import HomePageCarousel from "../components/carousel/HomePageCarousel";
import Feed from "../components/feed/Feed";

const Homepage = (props) => {
  return (
    <>
      <div className="container-fluid">
        <div className="carousel-container">
          <div className="carousel-container-main lf-s">
            <HomePageCarousel />
          </div>
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-6 gedf-main container">
          <Feed user={props.user} />
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default Homepage;
