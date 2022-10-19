import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogOut: (email, password) => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem("isLoggedIn");
        if (savedData === "1") {
            setIsLoggedIn(true);
        }
    }, []);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem("isLoggedIn", 1);
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn", 1);
        setIsLoggedIn(false);
    };

    return (
        <AuthContextProvider
            value={{
                isLoggedIn: isLoggedIn,
                onLogOut: { logoutHandler },
                onLogin: { loginHandler },
            }}
        >
            {props.children}
        </AuthContextProvider>
    );
};

export default AuthContext;
