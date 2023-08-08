import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ProblemSheetCard from "./ProblemSheetCard";
const ProblemList = (props) => {
  // console.log(props.list)
  return (
    <div>
      {props && props.list && (
        <ListGroup>
          {props.list.map((question, index) => {
            return <ProblemSheetCard problem={question} index={index + 1} />;
          })}
        </ListGroup>
      )}
    </div>
  );
};

export default ProblemList;
