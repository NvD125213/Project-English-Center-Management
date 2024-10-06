import React from "react";
import Header from "../../components/Header/Header.jsx"

import { Outlet } from "react-router-dom";
const Home = () => {

    return (
        <div className="App" id="main">
            <Header/>
            <Outlet />
        </div>
    )
}

export default Home