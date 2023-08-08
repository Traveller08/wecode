import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import apiService from "../../../services/apiService";
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
  const [problems, setProblems] = useState([]);
  useState(() => {
    const fetchContestProblems = async () => {
      try {
        const response = await apiService.getContestProblems(
          props.contest.id,
          "voyager_08"
        );
        let temp = [];
        response.data.problems.forEach((problem) => {
          let bg = "secondary";
          if (response.data.verdicts[problem.index] === "accepted") {
            bg = "success";
          }

          if (response.data.verdicts[problem.index] === "wrong answer") {
            bg = "danger";
          }
          temp.push({
            index: problem.index,
            verdict: response.data.verdicts[problem.index],
            bg: bg,
          });
        });
        console.log(temp);
        setProblems(temp);
      } catch (error) {
        console.log("Error fetching contest problems:", error);
      }
    };
    fetchContestProblems();
  }, []);
  return (
    <div className="c-card">
      <div className="c-name">{props.contest.name}</div>
      <Stack direction="horizontal" className="c-problems-container" gap={1}>
        {problems.map((problem) => {
          return (
            <Badge
              bg={problem.bg}
              pindex={problem.index}
              className="p-badge"
              onClick={handleProblem}
            >
              {problem.index}
            </Badge>
          );
        })}
      </Stack>
      <div className="c-btn-container">
        <Button
          className="c-btn"
          variant="outline-success"
          onClick={handleSolve}
        >
          solve
        </Button>

        <Button
          className="c-btn"
          variant="outline-success"
          onClick={handleVirtual}
        >
          start virtual
        </Button>
      </div>
    </div>
  );
};

export default ContestCard;
