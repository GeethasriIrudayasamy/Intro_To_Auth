import React, { useEffect, useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const ACTIONS = {
    USER_INPUT: "USER_INPUT",
    INPUT_BLUR: "INPUT_BLUR",
};

const emailReducer = (state, action) => {
    if (action.type === ACTIONS.USER_INPUT) {
        return { value: action.val, IsValid: action.val.includes("@") };
    }
    if (action.type === ACTIONS.INPUT_BLUR) {
        return { value: state.value, IsValid: state.value.includes("@") };
    }
    return { value: "", IsValid: false };
};

const passwordReducer = (state, action) => {
    if (action.type === ACTIONS.USER_INPUT) {
        return { value: action.val, IsValid: action.val.trim().length > 6 };
    }
    if (action.type === ACTIONS.INPUT_BLUR) {
        return { value: state.value, IsValid: state.value.trim().length > 6 };
    }
    return { value: "", IsValid: false };
};

const collegeReducer = (state, action) => {
    if (action.type === ACTIONS.USER_INPUT) {
        return { value: action.val, IsValid: action.val.trim().length > 7 };
    }
    if (action.type === ACTIONS.INPUT_BLUR) {
        return { value: state.value, IsValid: state.value.trim().length > 7 };
    }
    return { value: "", IsValid: false };
};

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState("");
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState("");
    // const [passwordIsValid, setPasswordIsValid] = useState();
    // const [enteredCollege, setEnteredCollege] = useState("");
    // const [collegeIsValid, setCollegeIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: "",
        IsValid: null,
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: "",
        IsValid: null,
    });

    const [collegeState, dispatchCollege] = useReducer(collegeReducer, {
        value: "",
        IsValid: null,
    });

    useEffect(() => {
        console.log("Effect Running");
        return () => {
            console.log("Effect Cleanup");
        };
    }, []);

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                emailState.IsValid &&
                    passwordState.IsValid &&
                    collegeState.IsValid
            );
        }, 500);

        return () => {
            clearTimeout(identifier);
        };
    }, [emailState.IsValid, passwordState.IsValid, collegeState.IsValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: ACTIONS.USER_INPUT, val: event.target.value });

        // setEnteredEmail(event.target.value);

        // setFormIsValid(
        //     event.target.value.includes("@") &&
        //         enteredPassword.trim().length > 6 &&
        //         enteredCollege.trim().length > 7
        // );
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: ACTIONS.USER_INPUT, val: event.target.value });
        // setEnteredPassword(event.target.value);
    };

    const collegeChangeHandler = (event) => {
        dispatchCollege({ type: ACTIONS.USER_INPUT, val: event.target.value });
        // setEnteredCollege(event.target.value);

        // setFormIsValid(
        //     event.target.value.trim().length > 7 &&
        //         emailState.IsValid &&
        //         passwordState.IsValid
        // );
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: ACTIONS.INPUT_BLUR });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: ACTIONS.INPUT_BLUR });
    };

    const validateCollegeHandler = () => {
        dispatchPassword({ type: ACTIONS.INPUT_BLUR });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState === false ? classes.invalid : ""
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordState === false ? classes.invalid : ""
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        collegeState === false ? classes.invalid : ""
                    }`}
                >
                    <label htmlFor="college">College</label>
                    <input
                        type="text"
                        id="college"
                        value={collegeState.value}
                        onChange={collegeChangeHandler}
                        onBlur={validateCollegeHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type="submit"
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
