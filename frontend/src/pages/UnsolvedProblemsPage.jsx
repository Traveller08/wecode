import React, { useState, useEffect } from "react";
import axios from "axios"; // You might need to install axios via npm or yarn
import Cookies from "js-cookie";
import Problems from "../components/practice/problems/Problems";
const UnsolvedProblemsPage = () => {
  const [attemptedProblems, setAttemptedProblems] = useState([]);
  const cfhandle = Cookies.get("cfHandle");

  useEffect(() => {
    // Fetch attempted problems of the user from Codeforces API
    const fetchAttemptedProblems = async () => {
      try {
        const response = await axios.get(
          `https://codeforces.com/api/user.status?handle=${cfhandle}`
        );

        // Filter out the problems without any accepted submissions
        const attemptedProblems = response.data.result.filter(
          (submission) => submission.verdict === "OK"
        );

        // Remove duplicates based on problem id (contestId + index)
        const uniqueProblems = [];
        const problemIds = new Set();
        response.data.result.forEach((submission) => {
          if (submission.verdict === "OK") {
            problemIds.add(
              `${submission.problem.contestId}-${submission.problem.index}`
            );
          }
        });
        attemptedProblems.forEach((submission) => {
          const problemId = `${submission.problem.contestId}_${submission.problem.index}`;
          if (!problemIds.has(problemId)) {
            problemIds.add(problemId);
            uniqueProblems.push(submission.problem);
          }
        });

        setAttemptedProblems(uniqueProblems);
      } catch (error) {
        console.error("Error fetching attempted problems:", error);
      }
    };
    // const fetchUserAttemptedProblems = async (handle) => {
    //   try {
    //     const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
    //     const data = await response.json();
    //     const acceptedProblems = new Set();
    //     const attemptedProblems = [];

    //     // Find all the problems with an accepted solution
    //     for (const submission of data.result) {
    //       if (submission.verdict === "OK") {
    //         acceptedProblems.add(`${submission.problem.contestId}-${submission.problem.index}`);
    //       }
    //     }

    //     // Filter problems with at least one submission and no accepted solution
    //     for (const submission of data.result) {
    //       const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
    //       if (!acceptedProblems.has(problemId) && submission.problem.rating !== undefined) {
    //         attemptedProblems.push(submission.problem);
    //         acceptedProblems.add(problemId); // Add to the set to avoid duplicates
    //       }
    //     }
    //     // console.log(attemptedProblems)

    //     return attemptedProblems;
    //   } catch (error) {
    //     console.error("Error fetching attempted problems:", error);
    //     return [];
    //   }
    // };

    fetchAttemptedProblems(cfhandle);
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <div className="col-md-3"></div>
      <div className="col-md-6 gedf-main">
        <h3 style={{ textAlign: "center" }}>Unsolved problems of {cfhandle}</h3>
        <Problems problems={attemptedProblems} />
      </div>
    </div>
  );
};

export default UnsolvedProblemsPage;
