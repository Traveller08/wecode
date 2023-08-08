import React from "react";
import "./Footer.css";

const WeCodeFooter = () => {
  return (
    <>
      <div className="bg-light text-center text-white footer">
        <div className="p-4 pb-0 ">
          <section className="mb-4 icon-container">
            <div className="icon-container-sh">
              <div floating className="m-1 footer-icon" href="#!" role="button">
                <i class="bi bi-facebook" style={{ color: "#3b5998" }}></i>
              </div>
            </div>

            <div className="icon-container-sh">
              <div floating className="m-1 footer-icon" href="#!" role="button">
                <i class="bi bi-twitter" style={{ color: "#55acee" }}></i>
              </div>
            </div>

            <div className="icon-container-sh">
              <div floating className="m-1 footer-icon" href="#!" role="button">
                <i class="bi bi-google" style={{ color: "#dd4b39" }}></i>
              </div>
            </div>
            <div className="icon-container-sh">
              <div floating className="m-1 footer-icon" href="#!" role="button">
                <i class="bi bi-instagram" style={{ color: "#ac2bac" }}></i>
              </div>
            </div>

            <div className="icon-container-sh">
              <div floating className="m-1 footer-icon" href="#!" role="button">
                <i className="bi bi-linkedin" style={{ color: "#0082ca" }}></i>
              </div>
            </div>

            <div className="icon-container-sh">
              <div floating className="m-1 footer-icon" href="#!" role="button">
                <i class="bi bi-github" style={{ color: "#333333" }}></i>
              </div>
            </div>
          </section>
        </div>

        <div
          className="text-center bg-secondary p-3"
          style={{ color: "rgba(0, 0, 0, 0.6)" }}
        >
          © 2023 Copyright:
          <a className="text-white" href="/">
            wecode.com
          </a>
        </div>
      </div>
    </>
  );
};

export default WeCodeFooter;
