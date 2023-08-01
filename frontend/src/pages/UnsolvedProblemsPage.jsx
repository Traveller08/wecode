import React, { useEffect } from "react";
import Problems from "../components/practice/problems/Problems";
import axios from "axios";
import { useState } from "react";

const UnsolvedProblemsPage = (props) => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const handleUnsolvedProblems = async () => {
      try {
        // Replace 'YOUR_CODEFORCES_HANDLE' with your actual Codeforces handle
        const codeforcesHandle = "voyager_08";

        // Call the Codeforces API to get all submissions of the user
        const response = await axios.get(
          `https://codeforces.com/api/user.status?handle=${codeforcesHandle}&from=1&count=100`
        );

        // Create a map to store the verdict of each problem
        const verdictMap = new Map();

        // Process each submission to determine the verdict of each problem
        response.data.result.forEach((submission) => {
          const { problem, verdict } = submission;
          if (problem && verdict) {
            const problemKey = `${problem.contestId}${problem.index}`;
            // If the problem is not already marked as "OK" (accepted), update the verdict
            if (verdictMap.get(problemKey) !== "OK") {
              verdictMap.set(problemKey, verdict);
            }
          }
        });

        // Filter the response to get unsolved problems
        const unsolvedProblems = response.data.result.filter(
          (submission) =>
            submission.problem &&
            verdictMap.get(
              `${submission.problem.contestId}${submission.problem.index}`
            ) !== "OK"
        );

        // Update the problems state with the unsolved problems
        console.log("unsolved problems without filter",unsolvedProblems);
        const problems_array = unsolvedProblems.map((problem)=>{
          return problem.problem;
        })
        console.log(problems_array);
        setProblems("prblem -> ", problems_array);
      } catch (error) {
        console.log("Error fetching unsolved problems:", error);
      }
    };
    handleUnsolvedProblems();
  }, []);

  return (
    <>
      <div className="container main-container">
        <div className="col-md-3"></div>
        <div className="col-md-7 gedf-main">
          <Problems problems={problems} />
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default UnsolvedProblemsPage;
