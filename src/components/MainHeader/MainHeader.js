import React from "react";
import Navigation from "./Navigation";

import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
    return (
        <header className={classes["main-header"]}>
            <h2>Hello There!</h2>
            <Navigation />
        </header>
    );
};

export default MainHeader;
