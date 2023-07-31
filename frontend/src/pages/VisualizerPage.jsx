import React from "react";
import LineGraph from "../components/practice/charts/LineGraph";
const VisualizerPage = () => {
  // const data = {
  //   labels: ["January", "February", "March", "April", "May", "June"],
  //   datasets: [
  //     {
  //       label: "Sample Data",
  //       data: [10, 20, 15, 30, 25, 40],
  //       borderColor: "rgba(255, 99, 132, 0.6)",
  //       backgroundColor: "rgba(255, 99, 132, 0.2)",
  //       fill: true,
  //     },
  //   ],
  // };
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [
          [0, 1],
          [1, 3],
          [2, 2],
          [3, 4],
          [4, 3],
        ],
      },
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <>
      {/* <div className="col-md-3"></div>
      <div className="col-md-6 gedf-main">
        
      </div>
      <div className="col-md-3"></div> */}

      <div>
        <h1>My App</h1>
        <LineGraph data={data} axes={axes} />
      </div>
    </>
  );
};

export default VisualizerPage;
