import Carousel from "react-bootstrap/Carousel";
import React from "react";
import img1 from "../../images/first.webp";
import img2 from "../../images/second.jpg";
import img3 from "../../images/third.webp";
import img4 from "../../images/img4.jpg";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const HomePageCarousel = () => {
  return (
    <Carousel fade style={{ width: "100%" }}>
      <Carousel.Item>
        <img
          className="d-block w-100 br-5 blur-image"
          src={img1}
          style={{ width: "100%", height: "450px" }}
          alt="First slide"
        />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
        <Carousel.Caption>
          <h3 className="caption-title">Unleash Your Potential</h3>
          <p className="caption-text">Learn, Share, and Inspire!</p>
          <a href="/register" className="btn btn-success btn-get-started">
            Get Started
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 br-5 blur-image"
          src={img2}
          style={{ width: "100%", height: "450px" }}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className="caption-title">Doubt Support & Discussion</h3>
          <p className="caption-text">
            Get your doubts resolved with AI-powered support. Join the vibrant
            community to learn, share, and grow together.
          </p>
          {Cookies.get("user") ? (
            <a className="btn btn-success btn-get-started" href="/">
              Explore Now
            </a>
          ) : (
            <a className="btn btn-success btn-get-started disabled" href="/">
              Explore Now
            </a>
          )}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 br-5 blur-image"
          src={img4}
          style={{ width: "100%", height: "450px" }}
          alt="Third slide"
        />

        <Carousel.Caption>
          <div>
            <h3 className="caption-title">
              Visualize Your Performance on Coding Platforms
            </h3>
            <p className="caption-text">
              Analyze your coding journey and track your progress on various
              coding platforms. Gain insights into your strengths and weaknesses
              to improve your skills.
            </p>
            {Cookies.get("user") ? (
              <a className="btn btn-success btn-get-started" href="/visualizer">
                Explore Now
              </a>
            ) : (
              <a
                className="btn btn-success btn-get-started disabled"
                href="/visualizer"
              >
                Explore Now
              </a>
            )}
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomePageCarousel;
