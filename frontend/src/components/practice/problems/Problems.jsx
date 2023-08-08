import React from "react";
import "./problems.css";
import ProblemCard from "./ProblemCard";
const Problems = (props) => {
  console.log("problems in ", props);
  return (
    <div className="p-container">
      {props.problems.map((problem) => {
        return (
          <ProblemCard
            key={problem.contestId + problem.index}
            problem={problem}
          />
        );
      })}
    </div>
  );
};

export default Problems;
