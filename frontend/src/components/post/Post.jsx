import React, { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Comments from "../comments/Comments";
import Cookies from "js-cookie";
import apiService from "../../services/apiService";
const Post = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [postRxn, setPostRxn] = useState("");
  const [postuserDetails, setPostuserDetails] = useState({});
  const [comments, setComments] = useState([]);
  const postid = props.postid;
  const getTime = (time) => {
    const t_esc = Date.now() - time;
    let mins = t_esc / 36000;
    let hrs = mins / 60;
    mins = parseInt(mins);
    hrs = parseInt(hrs);
    mins = mins % 60;

    const days = parseInt(hrs / 24);
    hrs = hrs % 24;
    return `${days} d ${hrs} h ${mins} min ago`;
  };
  const handleComments = async (e) => {
    if (showComments) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
  };
  

  useEffect(() => {
    const fetchPostUser = async () => {
      try {
      
        const response = await apiService.getPostUser(postid);
        setPostuserDetails(response.data[0]);
        
      } catch (error) {
        console.log("Error fetching post user data:", error);
      }
    };
    fetchPostUser();
  }, []);
  
  return (
    <>
      {
        postuserDetails  && postuserDetails.username &&
        <div className="gedf-card">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="mr-2">
                    <img
                      className="rounded-circle"
                      width="45"
                      src={postuserDetails.url?postuserDetails.url:"https://picsum.photos/50/50"}
                      alt="user"
                    />
                  </div>
                  <div className="ml-2">
                    <div className="h6 m-0">{postuserDetails.username}</div>
                    <div
                      className="h7 text-muted"
                      style={{ textAlign: "left" }}
                    >
                      {postuserDetails.firstName +
                        " " +
                        postuserDetails.lastName}
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <NavDropdown
                      title={<i class="bi bi-three-dots-vertical"></i>}
                      align={{ lg: "end" }}
                      id={`offcanvasNavbarDropdown-expand-lg`}
                    >
                      <NavDropdown.Item name="blogs">Hide</NavDropdown.Item>
                      <NavDropdown.Item name="tutorials">Save</NavDropdown.Item>
                      <NavDropdown.Item name="tutorials">
                        Report
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <p className="card-text sm-text">{props.data}</p>
            </div>
            <div className="card-footer">
              <div className="card-footer-left">
                <i
                  className={
                    postRxn === "thumbsup"
                      ? `f-icon bi bi-hand-thumbs-up-fill`
                      : `f-icon bi bi-hand-thumbs-up`
                  }
                  style={{ fontSize: "1.1rem" }}
                  onClick={() => {
                    if (postRxn === "thumbsup") {
                      setPostRxn("");
                    } else {
                      setPostRxn("thumbsup");
                    }
                  }}
                ></i>
                {/* <i class="bi bi-hand-thumbs-up-fill"></i> */}
                {/* <i class="bi bi-hand-thumbs-down-fill"></i> */}
                <i
                  className={
                    postRxn === "thumbsdown"
                      ? `f-icon bi bi-hand-thumbs-down-fill`
                      : `f-icon bi bi-hand-thumbs-down`
                  }
                  style={{ fontSize: "1.1rem" }}
                  onClick={() => {
                    if (postRxn === "thumbsdown") {
                      setPostRxn("");
                    } else {
                      setPostRxn("thumbsdown");
                    }
                  }}
                ></i>
                {!showComments ? (
                  <>
                    <i
                      class="f-icon bi bi-chat"
                      style={{
                        fontSize: "1.1rem",
                        transform: "rotate(360deg) scaleX(-1)",
                      }}
                      onClick={handleComments}
                    ></i>
                  </>
                ) : (
                  <>
                    <i
                      class="f-icon bi bi-chat-fill"
                      style={{
                        fontSize: "1.1rem",
                        transform: "rotate(360deg) scaleX(-1)",
                      }}
                      onClick={handleComments}
                    ></i>
                  </>
                )}

                <i
                  class="f-icon bi bi-share"
                  style={{ fontSize: "1.1rem" }}
                ></i>
              </div>
              <div className="card-footer-right">
                <div className="text-muted h7">
                  {" "}
                  <i class="bi bi-clock"></i> {getTime(props.createdtime)}
                </div>
              </div>
            </div>
          </div>
          {showComments &&  <Comments postid={postid} /> }
        </div>
      }
    </>
  );
};

export default Post;
