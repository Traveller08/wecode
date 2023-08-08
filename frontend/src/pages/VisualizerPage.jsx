import React, { useEffect, useState } from "react";
import LineGraph from "../components/practice/charts/LineGraph";
import PieChart from "../components/practice/charts/PieChart";
import BarGraph from "../components/practice/charts/BarGraph";
import Cookies from "js-cookie";
import Alert from "react-bootstrap/Alert";
import toast from "react-hot-toast";

const errorNotify = (message) => toast.error(message);

const VisualizerPage = () => {
  const [cfhandle, setCfhandle] = useState(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const cfhandle = Cookies.get("cfHandle");

    const checkCodeforcesHandleExists = async (handle) => {
      try {
        const response = await fetch(
          `https://codeforces.com/api/user.info?handles=${handle}`
        );
        const data = await response.json();

        if (data.status === "OK" && data.result.length > 0) {
          // Handle exists
          return true;
        } else {
          // Handle does not exist
          return false;
        }
      } catch (error) {
        // Error occurred while fetching data
        errorNotify("Error fetching codeforces data");
        console.error("Error checking Codeforces handle:", error);
        return false;
      }
    };

    if (cfhandle) {
      const exists = checkCodeforcesHandleExists(cfhandle);
      if (exists) {
        setCfhandle(cfhandle);
      }
    }
  }, []);

  return (
    <>
      {/* <div className="col-md-3"></div> */}
      {cfhandle ? (
        <>
          <div className="gedf-main visualizer">
            <div className="chart-container">
              <div className="chart-card lg-card">
                <LineGraph className="chart" cfhandle={cfhandle} />
              </div>
            </div>

            <PieChart cfhandle={cfhandle} />
            <BarGraph cfhandle={cfhandle} />
          </div>
        </>
      ) : (
        <>
          {show && (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Invalid codeforces handle</Alert.Heading>
              <p>
                Invalid codeforces handle. To continue{" "}
                <a href="/profile">update</a> your codeforces handle
              </p>
            </Alert>
          )}
        </>
      )}

      {/* <div className="col-md-3"></div> */}
    </>
  );
};

export default VisualizerPage;
