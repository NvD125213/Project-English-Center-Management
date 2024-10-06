import React from "react";
import Navbar from "./Navbar/Navbar";
import Topbar from "./Topbar/Topbar";

const Header = () => {
    return(
        <div className="header">
            <Topbar/>
            <Navbar/>
        </div>
    )
}

export default Header