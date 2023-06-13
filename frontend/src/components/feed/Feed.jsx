import React from "react";
import { Link } from "react-router-dom";

export default function Feed() {
  return (
    <>
      <div className="card gedf-card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mr-2">
                <img
                  className="rounded-circle"
                  width="45"
                  src="https://picsum.photos/50/50"
                  alt=""
                />
              </div>
              <div className="ml-2">
                <div className="h5 m-0">@LeeCross</div>
                <div className="h7 text-muted">Miracles Lee Cross</div>
              </div>
            </div>
            <div>
              <div className="dropdown">
                <button
                  className="btn btn-link dropdown-toggle"
                  type="button"
                  id="gedf-drop1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-ellipsis-h"></i>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="gedf-drop1"
                >
                  <div className="h6 dropdown-header">Configuration</div>
                  <Link className="dropdown-item" href="#">
                    Save
                  </Link>
                  <Link className="dropdown-item" href="#">
                    Hide
                  </Link>
                  <Link className="dropdown-item" href="#">
                    Report
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="text-muted h7 mb-2">
            {" "}
            <i className="fa fa-clock-o"></i>10 min ago
          </div>
          <Link className="card-link" href="#">
            <h5 className="card-title">
              Lorem ipsum dolor sit amet, consectetur adip.
            </h5>
          </Link>

          <p className="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            recusandae nulla rem eos ipsa praesentium esse magnam nemo dolor
            sequi fuga quia quaerat cum, obcaecati hic, molestias minima iste
            voluptates.
          </p>
        </div>
        <div className="card-footer">
          <Link href="#" className="card-link">
            <i className="fa fa-gittip"></i> Like
          </Link>
          <Link href="#" className="card-link">
            <i className="fa fa-comment"></i> Comment
          </Link>
          <Link href="#" className="card-link">
            <i className="fa fa-mail-forward"></i> Share
          </Link>
        </div>
      </div>

      <div className="card gedf-card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mr-2">
                <img
                  className="rounded-circle"
                  width="45"
                  src="https://picsum.photos/50/50"
                  alt=""
                />
              </div>
              <div className="ml-2">
                <div className="h5 m-0">@LeeCross</div>
                <div className="h7 text-muted">Miracles Lee Cross</div>
              </div>
            </div>
            <div>
              <div className="dropdown">
                <button
                  className="btn btn-link dropdown-toggle"
                  type="button"
                  id="gedf-drop1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-ellipsis-h"></i>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="gedf-drop1"
                >
                  <div className="h6 dropdown-header">Configuration</div>
                  <Link className="dropdown-item" href="#">
                    Save
                  </Link>
                  <Link className="dropdown-item" href="#">
                    Hide
                  </Link>
                  <Link className="dropdown-item" href="#">
                    Report
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="text-muted h7 mb-2">
            {" "}
            <i className="fa fa-clock-o"></i> 10 min ago
          </div>
          <Link className="card-link" href="#">
            <h5 className="card-title">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              consectetur deserunt illo esse distinctio.
            </h5>
          </Link>

          <p className="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            omnis nihil, aliquam est, voluptates officiis iure soluta alias vel
            odit, placeat reiciendis ut libero! Quas aliquid natus cumque quae
            repellendus. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Ipsa, excepturi. Doloremque, reprehenderit! Quos in maiores,
            soluta doloremque molestiae reiciendis libero expedita assumenda
            fuga quae. Consectetur id molestias itaque facere? Hic!
          </p>
          <div>
            <span className="badge badge-primary">JavaScript</span>
            <span className="badge badge-primary">Android</span>
            <span className="badge badge-primary">PHP</span>
            <span className="badge badge-primary">Node.js</span>
            <span className="badge badge-primary">Ruby</span>
            <span className="badge badge-primary">Paython</span>
          </div>
        </div>
        <div className="card-footer">
          <Link href="#" className="card-link">
            <i className="fa fa-gittip"></i> Like
          </Link>
          <Link href="#" className="card-link">
            <i className="fa fa-comment"></i> Comment
          </Link>
          <Link href="#" className="card-link">
            <i className="fa fa-mail-forward"></i> Share
          </Link>
        </div>
      </div>
      <div className="card gedf-card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mr-2">
                <img
                  className="rounded-circle"
                  width="45"
                  src="https://picsum.photos/50/50"
                  alt=""
                />
              </div>
              <div className="ml-2">
                <div className="h5 m-0">@LeeCross</div>
                <div className="h7 text-muted">Miracles Lee Cross</div>
              </div>
            </div>
            <div>
              <div className="dropdown">
                <button
                  className="btn btn-link dropdown-toggle"
                  type="button"
                  id="gedf-drop1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-ellipsis-h"></i>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="gedf-drop1"
                >
                  <div className="h6 dropdown-header">Configuration</div>
                  <Link className="dropdown-item" href="#">
                    Save
                  </Link>
                  <Link className="dropdown-item" href="#">
                    Hide
                  </Link>
                  <Link className="dropdown-item" href="#">
                    Report
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="text-muted h7 mb-2">
            {" "}
            <i className="fa fa-clock-o"></i> Hace 40 min
          </div>
          <Link className="card-link" href="#">
            <h5 className="card-title">
              Totam non adipisci hic! Possimus ducimus amet, dolores illo ipsum
              quos cum.
            </h5>
          </Link>

          <p className="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sunt
            fugit reprehenderit consectetur exercitationem odio, quam nobis?
            Officiis, similique, harum voluptate, facilis voluptas pariatur
            dolorum tempora sapiente eius maxime quaerat.
            <Link
              href="https://mega.nz/#!1J01nRIb!lMZ4B_DR2UWi9SRQK5TTzU1PmQpDtbZkMZjAIbv97hU"
              target="_blank"
            >
              https://mega.nz/#!1J01nRIb!lMZ4B_DR2UWi9SRQK5TTzU1PmQpDtbZkMZjAIbv97hU
            </Link>
          </p>
        </div>
        <div className="card-footer">
          <Link href="#" className="card-link">
            <i className="fa fa-gittip"></i> Like
          </Link>
          <Link href="#" className="card-link">
            <i className="fa fa-comment"></i> Comment
          </Link>
          <Link href="#" className="card-link">
            <i className="fa fa-mail-forward"></i> Share
          </Link>
        </div>
      </div>
    </>
  );
}
