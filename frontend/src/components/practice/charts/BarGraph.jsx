// import React from 'react';
// import CanvasJSReact from '@canvasjs/react-charts';
// //var CanvasJSReact = require('@canvasjs/react-charts');
 
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const BarGraph = () => {
//     const options = {
//         title: {
//             text: "Basic Column Chart"
//         },
//         data: [
//         {
//             // Change type to "doughnut", "line", "splineArea", etc.
//             type: "column",
//             dataPoints: [
//                 { label: "Apple",  y: 10  },
//                 { label: "Orange", y: 15  },
//                 { label: "Banana", y: 25  },
//                 { label: "Mango",  y: 30  },
//                 { label: "Grape",  y: 28  }
//             ]
//         }
//         ]
//     }
//   return (
//     <div>
//         <CanvasJSChart options = {options}
// 				/* onRef={ref => this.chart = ref} */
// 			/>
//     </div>
//   )
// }

// export default BarGraph;

import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarGraph = () => {
  const [ratingWiseProblems, setRatingWiseProblems] = useState([]);
  const [indexWiseProblems, setIndexWiseProblems] = useState([]);

  const fetchCodeforcesData = (codeforcesUsername) => {
    axios
      .get(`https://codeforces.com/api/user.status?handle=${codeforcesUsername}`)
      .then((response) => {
        const problemsData = response.data.result;
  
        // Calculate rating wise problems count
        const ratingCounts = {};
        problemsData.forEach((problem) => {
          if (problem.verdict === 'OK') {
            const rating = problem.problem.rating || 'Unrated';
            const key = `${problem.contestId}-${problem.problem.index}`;
            if (!ratingCounts[rating]) {
              ratingCounts[rating] = new Set([key]);
            } else {
              ratingCounts[rating].add(key);
            }
          }
        });
        const ratingDataPoints = Object.entries(ratingCounts).map(([label, indices]) => ({
          label,
          y: indices.size,
        }));
        setRatingWiseProblems(ratingDataPoints);
  
        // Calculate index wise problems count
        const indexCounts = {};
        problemsData.forEach((problem) => {
          if (problem.verdict === 'OK') {
            const index = problem.problem.index;
            indexCounts[index] = (indexCounts[index] || 0) + 1;
          }
        });
        const indexDataPoints = Object.entries(indexCounts).map(([label, y]) => ({
          label,
          y,
        }));
        setIndexWiseProblems(indexDataPoints);
      })
      .catch((error) => {
        console.error('Error fetching Codeforces data:', error);
      });
  };
  
  

  useEffect(() => {
    const codeforcesUsername = 'voyager_08'; // Replace with your Codeforces handle
    fetchCodeforcesData(codeforcesUsername);
  }, []);
  indexWiseProblems.sort((a, b) => a.label.localeCompare(b.label));


  const optionsRating = {
    title: {
      text: 'Rating-wise Problems Count',
    },
    data: [
      {
        type: 'column',
        dataPoints: ratingWiseProblems,
      },
    ],
  };

  const optionsIndex = {
    title: {
      text: 'Index-wise Problems Count',
    },
    data: [
      {
        type: 'column',
        dataPoints: indexWiseProblems,
      },
    ],
  };

  return (
    <>
     <div className="chart-container">
          <div className="chart-card lg-card">
          <CanvasJSChart options={optionsRating} />
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-card lg-card">
          <CanvasJSChart options={optionsIndex} />
          </div>
        </div>
     
     

    </>
  );
};

export default BarGraph;
