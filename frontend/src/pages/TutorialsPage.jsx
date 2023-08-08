import React from "react";
import "../components/customrow/customRow";
import Row from "../components/customrow/customRow";
import { tutorials } from "../data/tutorial";
import "./TutorialsPage.css";

const TutorialsPage = () => {
  return (
    <div className="tutorials-page">
      {tutorials.map((t, index) => (
        <Row key={index} title={t.title} linkArray={t.linkArray} />
      ))}
    </div>
  );
};

export default TutorialsPage;
