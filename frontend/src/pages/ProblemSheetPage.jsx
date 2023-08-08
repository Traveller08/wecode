import React, { useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import ProblemList from "../components/practice/problemSheets/ProblemList";
import {list as lovebabbarsheet} from "../data/lovebabbarsheet";
const ProblemSheetPage = () => {
  const [active, setActive] = useState("lovebabbar");
  const items = [
    {
      title: "Fruits",
      items: ["Apple", "Banana", "Orange"],
    },
    {
      title: "Vegetables",
      items: ["Carrot", "Broccoli", "Tomato"],
    },
  ];
  return (
    <>
   
      <div className="tab-content" style={{ border: "none" }}>
        <div className="card-header">
          <ul
            className="nav nav-tabs card-header-tabs"
            id="myTab"
            role="tablist"
          >
            {/* <li className="nav-item">
              <Link
                className={
                  active === "striver" ? "nav-link active" : "nav-link"
                }
                id="posts-tab"
                data-toggle="tab"
                href="#posts"
                role="tab"
                aria-controls="posts"
                aria-selected="true"
                onClick={() => {
                  setActive("striver");
                }}
              >
                Striver's sheet
              </Link>
            </li> */}
            <li className="nav-item">
              <Link
                className={
                  active === "lovebabbar" ? "nav-link active" : "nav-link"
                }
                id="posts-tab"
                data-toggle="tab"
                href="#posts"
                role="tab"
                aria-controls="posts"
                aria-selected="true"
                onClick={() => {
                  setActive("lovebabbar");
                }}
              >
                Love Babbar's sheet
              </Link>
            </li>
          </ul>
        </div>
        </div>
        <div className="card-body mt-2">
          <div className="tab-content" id="myTabContent">

          {
            active==="lovebabbar" &&lovebabbarsheet.map((topicList)=>{
              return  <Accordion>
              <Accordion.Item eventKey={topicList.position}>
                <Accordion.Header>{topicList.topicName}</Accordion.Header>
                <Accordion.Body>
                    <ProblemList list={topicList.questions} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            })
          }

         

      
        </div>
        </div>
      
    </>
  );
};

export default ProblemSheetPage;
