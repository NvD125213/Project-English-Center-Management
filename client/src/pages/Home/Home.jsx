import React from "react";
import Header from "../../components/Header/Header.jsx"

import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/index.jsx";
const Home = () => {

    return (
        <div className="App" id="main">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Home