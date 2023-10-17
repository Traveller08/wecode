import React, { useEffect, useLayoutEffect, useState, useTransition } from "react";
import "./contests.css";
import ContestCard from "./ContestCard";
import axios from "axios";

const Contests = (props) => {
    const [loading, startTransition] = useTransition();
    const [submissions, setSubmissions] = useState({});
    const [problems, setProblems] = useState({});

    useEffect(() => {
        const submissions = {};
        const problems = {};

        (async function () {
            // Get all the submissions for the current user and store in state
            const user = "voyager_08";

            const [{ data: submissionsData }, { data: problemsData }] = await Promise.all([
                axios.get(`https://codeforces.com/api/user.status?handle=${user}&from=1`),
                axios.get("https://codeforces.com/api/problemset.problems"),
            ]);

            // Do more loogic to get the user's problems and store in a dictionary for easy access by each ContestCard
            startTransition(() => {
                submissionsData.result.forEach((submission) => {
                    if (submissions[submission.contestId]?.length > 0) {
                        submissions[submission.contestId].push(submission);
                    } else {
                        submissions[submission.contestId] = [submission];
                    }
                });
                problemsData.result.problems.forEach((problem) => {
                    if (problems[problem.contestId]?.length > 0) {
                        problems[problem.contestId].push(problem);
                    } else {
                        problems[problem.contestId] = [problem];
                    }
                });
                setSubmissions(submissions);
                setProblems(problems);
                
            });
        })();
    }, []);

    return (
        <div className="p-container">
            {props.contests.map((contest, i) => {
                return (
                    <ContestCard
                        contest={contest}
                        problems={Object.keys(problems).length !== 0 ? problems[contest.id] : []}
                        submissions={Object.keys(submissions).length !== 0 ? submissions[contest.id] : []}
                        type={props.contestType}
                        key={i}
                    />
                );
            })}
        </div>
    );
};

export default Contests;
