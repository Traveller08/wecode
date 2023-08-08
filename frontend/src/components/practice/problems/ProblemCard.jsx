import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const ProblemCard = (props) => {
  const navigate = useNavigate();
  const handleSolve = () => {
    const url = `https://codeforces.com/problemset/problem/${props.problem.contestId}/${props.problem.index}`;
    console.log(url);
    window.open(url);
  };
  return (
    <div className="p-card">
      <div className="p-name">{props.problem.name}</div>
      <div className="p-tags">
        {props.problem.tags.map((tag) => {
          return `${tag}, `;
        })}
      </div>
      <div className="p-rating">{props.problem.rating}</div>
      <div className="p-btn-container">
        <Button
          className="p-btn"
          variant="outline-success"
          onClick={handleSolve}
        >
          {props.problem.solved ? "solved" : "solve"}
        </Button>
      </div>
    </div>
  );
};

export default ProblemCard;
