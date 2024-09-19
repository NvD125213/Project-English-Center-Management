import React from "react";
import Header from '../Header/Header'
import HomeBanner from "../HomeBanner/HomeBanner";
import HomeIndex from "../HomeIndex/HomeIndex";

const Home = () => {

    return (
        <div id="main">
            <Header/>
            <HomeBanner/>
            <HomeIndex/>
        </div>
    )
}

export default Home