import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { options } from "../../../data/problems.js";
import Button from "react-bootstrap/esm/Button.js";
const ProblemsLeftBar = (props) => {
  return (
    <div>
      <div className="card lf-s" style={{ border: "none" }}>
        <div className="card-header">Filter Problems</div>
        <div className="card-body">
          <div className="list-group-flush">
            <div className="difficulty">
              <InputGroup className="mb-3">
                <InputGroup.Text>Difficulty: </InputGroup.Text>
                <Form.Control
                  aria-label="From"
                  placeholder="from - "
                  value={props.from}
                  onChange={props.handleFrom}
                />
                <Form.Control
                  aria-label="To"
                  placeholder="to"
                  value={props.to}
                  onChange={props.handleTo}
                />
              </InputGroup>
            </div>

            <div className="tags">
              {props.tags.map((tag) => {
                return (
                  <Badge pill bg="info" className="p-tag">
                    {tag}{" "}
                    <i
                      className="bi bi-x p-tag-close-btn"
                      id={tag}
                      onClick={props.removeTag}
                    ></i>
                  </Badge>
                );
              })}
            </div>
            <hr />
            <div className="p-tag-select">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Add tag
                </InputGroup.Text>
                <Form.Select
                  aria-label="Default select example"
                  onChange={props.addTag}
                >
                  {options.map((option) => {
                    return <option value={option.value}>{option.title}</option>;
                  })}
                </Form.Select>
              </InputGroup>
            </div>
            <div className="p-btn-container">
              <Button
                variant="outline-primary"
                onClick={props.handleProblemsForm}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsLeftBar;
