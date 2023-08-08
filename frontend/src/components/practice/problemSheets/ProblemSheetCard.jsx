import React, { useState } from "react";
import "./psheet.css";
const ProblemSheetCard = (props) => {
  return (
    <>
      {props.problem && (
        <div className="c-card ps-card">
          <div className="ps-name">
            {props.index + ". " + props.problem.Problem}
          </div>
          <div className="ps-btn-container">
            {props.problem.URL && (
              <a
                className="card-link nav-link"
                target="__blank"
                href={props.problem.URL}
              >
                Link
              </a>
            )}
            {props.problem.URL1 && (
              <a
                className="card-link nav-link"
                target="__blank"
                href={props.problem.URL1}
              >
                Link
              </a>
            )}
            {props.problem.URL2 && (
              <a
                className="card-link nav-link"
                target="__blank"
                href={props.problem.URL2}
              >
                Link
              </a>
            )}
            {props.problem.URL3 && (
              <a
                className="card-link nav-link"
                target="__blank"
                href={props.problem.URL3}
              >
                Link
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemSheetCard;
