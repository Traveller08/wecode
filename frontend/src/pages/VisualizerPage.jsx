import React from "react";
import LineGraph from "../components/practice/charts/LineGraph";
import PieChart from "../components/practice/charts/PieChart";
import BarGraph from "../components/practice/charts/BarGraph";
const VisualizerPage = () => {
  return (
    <>
      {/* <div className="col-md-3"></div> */}
      <div className="gedf-main visualizer">
        <div className="chart-container">
          <div className="chart-card lg-card">
            <LineGraph className="chart" />
          </div>
        </div>
        
       <PieChart />
       <BarGraph />
    

        </div>


      {/* <div className="col-md-3"></div> */}
    </>
  );
};

export default VisualizerPage;
