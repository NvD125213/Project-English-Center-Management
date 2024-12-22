import React from "react";
import './PageTitle.css'

const PageTitle = ({ title }) => {
    return (
        <div className="page-title-container d-flex align-items-center justify-content-center">
            <h1 className="text-white">{title}</h1>
        </div>
    );
};

export default PageTitle;
