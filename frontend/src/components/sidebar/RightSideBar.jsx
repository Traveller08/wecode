import React from "react";
import { Link } from "react-router-dom";

const RightSideBar = () => {
  return (
    <>
      <div className="col-md-3">
        <div className="card gedf-card">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <Link href="#" className="card-link">
              Card link
            </Link>
            <Link href="#" className="card-link">
              Another link
            </Link>
          </div>
        </div>
        <div className="card gedf-card">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <Link href="#" className="card-link">
              Card link
            </Link>
            <Link href="#" className="card-link">
              Another link
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSideBar;
