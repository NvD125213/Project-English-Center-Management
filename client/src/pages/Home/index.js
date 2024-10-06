import React from "react";
import HomeBanner from "./HomeBanner/HomeBanner.jsx";
import HomeIndex from "./HomeIndex/HomeIndex.jsx";
import HomeRoadmap from "./HomeRoadmap/HomeRoadmap.jsx";
import HomeRoute from "./HomeRoute/HomeRoute.jsx";
import HomeTeacher from "./HomeTeacher/HomeTeacher.jsx";
import HomeCentificate from "./HomeCentificate/HomeCentificate.jsx";
import HomeReview from "./HomeReview/HomeReview.jsx";
import HomeCommit from "./HomeCommit/HomeCommit.jsx";
import HomeLogo from "./HomeLogo/HomeLogo.jsx";

const HomeIngre = () => {

    return (
        <div>
            <HomeBanner/>
            <HomeIndex/>
            <HomeRoadmap />
            <HomeRoute />
            <HomeTeacher />
            <HomeCentificate />
            <HomeReview />
            <HomeCommit />
            <HomeLogo />
        </div>
    )
}

export default HomeIngre