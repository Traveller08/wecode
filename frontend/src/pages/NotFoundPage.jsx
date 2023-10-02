import React from 'react'
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const handleHomePageClick = () => {
        navigate("")
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
            <div className="col-md-6">
                <i className="bi bi-exclamation-triangle h1"></i>
            </div>
            <div className="col-md-6 fw-bold mb-3">
                404 - Page Not Found
            </div>
            <div className="col-md-6">
                The Page you are looking for doesn't exist or an other error occured.
                Go to <a href="/">Home Page</a>
            </div>
        </div>
    )
}

export default NotFoundPage
