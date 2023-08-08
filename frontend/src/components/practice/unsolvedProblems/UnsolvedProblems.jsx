import React from "react";
import ProblemCard from "../problems/ProblemCard";

const UnsolvedProblems = (props) => {
  return (
    <div className="p-container">
      {props.problems.map((problem) => {
        return <ProblemCard problem={problem} />;
      })}
    </div>
  );
};

export default UnsolvedProblems;
