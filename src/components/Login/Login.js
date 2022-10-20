import React, {
    useEffect,
    useState,
    useReducer,
    useContext,
    useRef,
} from "react";
import Input from "../Input/Input";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Context/auth-context";

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
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const collegeInputRef = useRef();

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

    const authCtx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value);
        } else if (!emailState.IsValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    id="email"
                    label="E-Mail"
                    type="email"
                    isValid={emailState.IsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    ref={passwordInputRef}
                    id="password"
                    label="Password"
                    type="password"
                    isValid={passwordState.IsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
                <Input
                    ref={collegeInputRef}
                    id="college"
                    label="college"
                    type="text"
                    isValid={collegeState.IsValid}
                    value={collegeState.value}
                    onChange={collegeChangeHandler}
                    onBlur={validateCollegeHandler}
                />

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
