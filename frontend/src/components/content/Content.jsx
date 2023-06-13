import React from "react";
import Feed from "../feed/Feed";
import { Link } from "react-router-dom";
const Content = () => {
      return (
        <>
          <div className="col-md-6 gedf-main">
            <div className="card gedf-card">
              <div className="card-header">
                <ul
                  className="nav nav-tabs card-header-tabs"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="posts-tab"
                      data-toggle="tab"
                      href="#posts"
                      role="tab"
                      aria-controls="posts"
                      aria-selected="true"
                    >
                      Make a publication
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      id="images-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="images"
                      aria-selected="false"
                      href="#images"
                    >
                      Images
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="posts"
                    role="tabpanel"
                    aria-labelledby="posts-tab"
                  >
                    <div className="form-group">
                      <label className="sr-only" for="message">
                        post
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="3"
                        placeholder="What are you thinking?"
                      ></textarea>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="images"
                    role="tabpanel"
                    aria-labelledby="images-tab"
                  >
                    <div className="form-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="customFile"
                        />
                        <label className="custom-file-label" for="customFile">
                          Upload image
                        </label>
                      </div>
                    </div>
                    <div className="py-4"></div>
                  </div>
                </div>
                <div className="btn-toolbar justify-content-between">
                  <div className="btn-group">
                    <button type="submit" className="btn btn-primary">
                      share
                    </button>
                  </div>
                  <div className="btn-group">
                    <button
                      id="btnGroupDrop1"
                      type="button"
                      className="btn btn-link dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-globe"></i>
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="btnGroupDrop1"
                    >
                      <Link className="dropdown-item" href="#">
                        <i className="fa fa-globe"></i> Public
                      </Link>
                      <Link className="dropdown-item" href="#">
                        <i className="fa fa-users"></i> Friends
                      </Link>
                      <Link className="dropdown-item" href="#">
                        <i className="fa fa-user"></i> Just me
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Feed />
          </div>
        </>
      );
}


export default Content;