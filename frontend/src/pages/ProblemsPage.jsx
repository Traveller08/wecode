import React from "react";
import Problems from "../components/practice/problems/Problems";
import Contests from "../components/practice/contests/Contests";
import CompanyWise from "../components/practice/companyWise/CompanyWise";
import ProblemSheet from "../components/practice/problemSheets/ProblemList";
import ProblemsLeftBar from "../components/practice/problems/ProblemsLeftBar";
import apiService from "../services/apiService";
import { useState } from "react";
const ProblemsPage = (props) => {
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [problems, setProblems] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const handleFrom = (e) =>{
        setFrom(e.target.value);
  }
  const handleTo =(e) =>{
        setTo(e.target.value);
  }
  const addTag = (e) => {
    setTags([...tags, e.target.value]);   
  };
  const removeTag = (tagToDelete) => {
    setTags(
      tags.filter((tag) => {
        return tag !== tagToDelete.target.id;
      })
    );
  };
  const handleProblemsForm = async () => {
    try {
      const response = await apiService.getProblems(tags, from, to);
      console.log(response.data);
      setProblems(response.data);
    } catch (error) {}
  };
  return (
    <>
     <div className="container main-container">
      <div className="col-md-3">
        <ProblemsLeftBar
          tags={tags}
          setTags={setTags}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          addTag={addTag}
          removeTag={removeTag}
          handleProblemsForm={handleProblemsForm}
          from={from}
          handleFrom={handleFrom}
          to={to}
          handleTo={handleTo}
        />
      </div>
      <div className="col-md-7 gedf-main">
        <Problems problems={problems} />
      </div>
      {/* <div className="col-md-3"></div> */}
      </div>
    </>
  );
};

export default ProblemsPage;
