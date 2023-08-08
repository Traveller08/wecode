import React from "react";
import Contests from "../components/practice/contests/Contests";
import ContestsLeftbar from "../components/practice/contests/ContestsLeftbar";
import apiService from "../services/apiService";
import { useState } from "react";
const ProblemsPage = (props) => {
  const [contests, setContests] = useState([]);
  const [contestType, setContestType] = useState("");
  const handleContestsForm = async () => {
    try {
      const response = await apiService.getContests(contestType);
      console.log(response.data);
      setContests(response.data);
    } catch (error) {}
  };
  return (
    <>
      <div className="container main-container">
        <div className="col-md-3">
          <ContestsLeftbar
            setContestType={setContestType}
            setContests={handleContestsForm}
          />
        </div>
        <div className="col-md-7 gedf-main">
          <Contests contests={contests} contestType={contestType} />
        </div>
        {/* <div className="col-md-3"></div> */}
      </div>
    </>
  );
};

export default ProblemsPage;
