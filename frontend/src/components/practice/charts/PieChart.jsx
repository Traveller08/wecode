import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = (props) => {
  const [verdictData, setVerdictData] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [attemptedSolvedData, setAttemptedSolvedData] = useState([]);

  const fetchCodeforcesData = (codeforcesUsername) => {
    axios
      .get(
        `https://codeforces.com/api/user.status?handle=${codeforcesUsername}`
      )
      .then((response) => {
        const problemsData = response.data.result;
        const uniqueProblems = new Set();
        const verdictCounts = {};
        const languageCounts = {};
        const tagsCounts = {};

        problemsData.forEach((problem) => {
          // Count unique problems attempted
          uniqueProblems.add(problem.problem.contestId + problem.problem.index);

          // Count problems verdict
          if (!verdictCounts[problem.verdict]) {
            verdictCounts[problem.verdict] = 1;
          } else {
            verdictCounts[problem.verdict]++;
          }

          // Count languages used
          if (!languageCounts[problem.programmingLanguage]) {
            languageCounts[problem.programmingLanguage] = 1;
          } else {
            languageCounts[problem.programmingLanguage]++;
          }

          // Count problems solved by tags
          problem.problem.tags.forEach((tag) => {
            if (!tagsCounts[tag]) {
              tagsCounts[tag] = 1;
            } else {
              tagsCounts[tag]++;
            }
          });
        });

        const attemptedCount = uniqueProblems.size;
        let solvedCount = 0;
        problemsData.forEach((problem) => {
          if (problem.verdict === "OK") {
            solvedCount++;
          }
        });

        // Prepare data for pie charts
        const verdictDataPoints = Object.entries(verdictCounts).map(
          ([name, y]) => ({
            name,
            y,
          })
        );

        const languageDataPoints = Object.entries(languageCounts).map(
          ([name, y]) => ({
            name,
            y,
          })
        );

        const tagsDataPoints = Object.entries(tagsCounts).map(([name, y]) => ({
          name,
          y,
        }));

        const attemptedSolvedDataPoints = [
          { name: "Attempted", y: attemptedCount },
          { name: "Solved", y: solvedCount },
          { name: "Unsolved", y: attemptedCount - solvedCount },
        ];

        // Update state variables with the data
        setVerdictData(verdictDataPoints);
        setLanguageData(languageDataPoints);
        setTagsData(tagsDataPoints);
        setAttemptedSolvedData(attemptedSolvedDataPoints);
      })
      .catch((error) => {
        console.error("Error fetching Codeforces data:", error);
      });
  };

  useEffect(() => {
    const codeforcesUsername = props.cfhandle; // Replace with your Codeforces handle
    fetchCodeforcesData(codeforcesUsername);
  }, []);

  const formatDataForTooltip = (dataPoints) => {
    let total = 0;
    dataPoints.forEach((dataPoint) => {
      total += dataPoint.y;
    });

    const formattedDataPoints = dataPoints.map((dataPoint) => {
      const percentage = ((dataPoint.y / total) * 100).toFixed(2);
      return {
        ...dataPoint,
        y: `${percentage}% (${dataPoint.y})`,
      };
    });

    return formattedDataPoints;
  };

  const optionsVerdict = {
    animationEnabled: true,
    title: {
      text: "Problems Verdict",
    },
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###",
        dataPoints: verdictData,
      },
    ],
  };

  const optionsLanguage = {
    animationEnabled: true,
    title: {
      text: "Languages Used",
    },
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###",
        dataPoints: languageData,
      },
    ],
  };

  const optionsTags = {
    animationEnabled: true,
    title: {
      text: "Problems Solved by Tags",
    },
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###",
        dataPoints: tagsData,
      },
    ],
  };

  const optionsAttemptedSolved = {
    animationEnabled: true,
    title: {
      text: "No. of Attempted, Solved, and Unsolved Problems",
    },
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###",
        dataPoints: attemptedSolvedData,
      },
    ],
  };

  return (
    <>
      <div className="chart-container">
        <div className="chart-card sm-card">
          <CanvasJSChart options={optionsVerdict} />
        </div>
        <div className="chart-card sm-card">
          <CanvasJSChart options={optionsLanguage} />
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-card sm-card">
          <CanvasJSChart options={optionsTags} />
        </div>
        <div className="chart-card sm-card">
          <CanvasJSChart options={optionsAttemptedSolved} />
        </div>
      </div>
    </>
  );
};

export default PieChart;
