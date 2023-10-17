import React, { useLayoutEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import apiService from "../../../services/apiService";
import axios from "axios";

const ContestCard = (props) => {
    const handleSolve = (contest) => {
        const url = `https://codeforces.com/contest/${props.contest.id}`;
        console.log(url);
        window.open(url);
    };

    const handleVirtual = () => {
        const url = `https://codeforces.com/contestRegistration/${props.contest.id}/virtual/true`;
        console.log(url);
        window.open(url);
    };
    const handleProblem = (e) => {
        // console.log(e.target.innerHTML)
        const url = `https://codeforces.com/contest/${props.contest.id}/problem/${e.target.innerHTML}`;
        window.open(url);
    };

    function getBg(problem) {
        let bg = "secondary";

        props.submissions?.forEach((submission) => {
            if (submission.problem.index === problem.index) {
                if (submission.verdict === "OK") {
                    bg = "success";
                } else {
                    if (bg !== "success") bg = "danger";
                }
            }
        });
        return bg;
    }

    return (
        <div className="c-card">
            <div className="c-name w-100">{props.contest.name}</div>
            <Stack direction="horizontal" className="c-problems-container" gap={1}>
                {props.problems?.map((problem) => {
                    return (
                        <Badge
                            bg={getBg(problem)}
                            pindex={problem.index}
                            className="p-badge"
                            onClick={handleProblem}
                        >
                            {problem.index}
                        </Badge>
                    );
                })}
            </Stack>
            <div className="d-flex justify-content-end c-btn-container w-100">
                <Button className="c-btn" variant="outline-success" onClick={handleSolve}>
                    solve
                </Button>

                <Button className="c-btn" variant="outline-success" onClick={handleVirtual}>
                    start virtual
                </Button>
            </div>
        </div>
    );
};

export default ContestCard;
