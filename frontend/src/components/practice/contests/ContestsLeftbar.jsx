import React, { useState } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { options } from "../../../data/contests.js";
import Button from "react-bootstrap/Button";
const ContestsLeftbar = (props) => {
  const handleContestType = (e) => {
    props.setContestType(e.target.value);
  };
  const handleSubmit = async () => {
    await props.setContests();
  };
  return (
    <div>
      <div className="card lf-s" style={{ border: "none" }}>
        <div className="card-header">Filter contests</div>
        <div className="card-body">
          <div className="list-group-flush">
            <div className="p-tag-select">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Select contest type
                </InputGroup.Text>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleContestType}
                >
                  {options.map((option) => {
                    return <option value={option.value}>{option.title}</option>;
                  })}
                </Form.Select>
              </InputGroup>
            </div>
            <div className="p-btn-container">
              <Button variant="outline-primary" onClick={handleSubmit}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestsLeftbar;
