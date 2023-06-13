import React from 'react';

const LeftSideBar = () => {

    return (
      <>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="h5">@LeeCross</div>
              <div className="h7 text-muted">Fullname : Miracles Lee Cross</div>
              <div className="h7">
                Developer of web applications, JavaScript, PHP, Java, Python,
                Ruby, Java, Node.js, etc.
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="h6 text-muted">Followers</div>
                <div className="h5">5.2342</div>
              </li>
              <li className="list-group-item">
                <div className="h6 text-muted">Following</div>
                <div className="h5">6758</div>
              </li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>
        </div>
      </>
    );
}

export default LeftSideBar

