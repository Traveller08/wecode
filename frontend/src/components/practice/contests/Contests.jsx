import React from "react";
import "./contests.css";
import ContestCard from "./ContestCard";
const Contests = (props) => {
  console.log(props);
  return (
    <div className="p-container">
      {props.contests.map((contest) => {
        return <ContestCard contest={contest} type={props.contestType} />;
      })}
    </div>
  );
};

export default Contests;
