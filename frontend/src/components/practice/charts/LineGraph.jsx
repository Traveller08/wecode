import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const getRatingLevel = (rating) => {
  if (rating < 1200) {
    return "Newbie";
  } else if (rating < 1400) {
    return "Pupil";
  } else if (rating < 1600) {
    return "Specialist";
  } else if (rating < 1900) {
    return "Expert";
  } else if (rating < 2100) {
    return "Candidate Master";
  } else if (rating < 2300) {
    return "Grandmaster";
  } else {
    return "International Grandmaster";
  }
};

const LineGraph = (props) => {
  const [contestData, setContestData] = useState([]);

  useEffect(() => {
    const codeforcesUsername = props.cfhandle; // Replace with your Codeforces handle

    axios
      .get(
        `https://codeforces.com/api/user.rating?handle=${codeforcesUsername}`
      )
      .then((response) => {
        const contestRatings = response.data.result.map((contest) => ({
          x: new Date(contest.ratingUpdateTimeSeconds * 1000),
          y: contest.newRating,
          ratingChange: contest.newRating - contest.oldRating,
          ratingLevel: getRatingLevel(contest.newRating), // Get the rating level
          rank: contest.rank,
          contestName: contest.contestName,
        }));

        setContestData(contestRatings);
      })
      .catch((error) => {
        console.error("Error fetching contest ratings:", error);
      });
  }, []);

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1",
    title: {
      text: "Contest Ratings",
    },
    axisY: {
      title: "Rating",
    },
    axisX: {
      title: "Contest Date",
    },
    data: [
      {
        type: "line",
        dataPoints: contestData,
        toolTipContent: `<b>Contest Date:</b> {x}<br/>
                         <b>New Rating:</b> {y}<br/>
                         <b>Rating Change:</b> {ratingChange}<br/>
                         <b>Rating Level:</b> {ratingLevel}<br/>
                         <b>Rank:</b> {rank}<br/>
                         <b>Contest Name:</b> {contestName}`,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default LineGraph;
