import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/login.module.css";
import validate from "../validationRules/LoginVR";
import LoginForm from "./Forms/LoginForm";
import ForgotPassword from "./Modals/ForgotPassword";

export default function Login() {
    // loginDetails are details the user inputs before validation
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    // validatedLoginDetails are the user inputs but validated
    const [validatedLoginData, setValidatedLoginData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState([]);
    const [validLogin, setValidLogin] = useState(true);
    const [displayModal, setDisplayModal] = useState(false);

    const handleLogin = (e) => {
        console.log("loginProcess");
        e.preventDefault();

        // runs validation on the logindetails
        let newErrors = checkErrors(loginData);

        // if there are no errors...
        if (Object.keys(newErrors).length === 0) {
            setValidatedLoginData(loginData);
            handleCheckUser();
        }
    };

    // check if the user is registered
    const handleCheckUser = () => {
        console.log(validatedLoginData);
        // send data to check if user is registered and details are correct.
        // create error message for invalid login details
        // if they are set valid login to true
        // setValidLogin(true)
        // if they are not then set invalid
        // setValidLogin(false);
    };

    const handleRegister = (e) => {
        console.log("Registration process");
        e.preventDefault();
        // send them to registration page
    };

    const checkErrors = (data) => {
        let newErrors = validate(data);
        setErrors(newErrors);
        return newErrors;
    };

    const handleForgotPassword = (e) => {
        setDisplayModal(!displayModal);
        setErrors([]);
        e.preventDefault();
    };

    const handleCancel = (e) => {
        e.preventDefault();

        setErrors({});
        setDisplayModal(!displayModal);
    };

    return (
        <div
            className={`container blue-background black-text border-bottom-white`}
        >
            <div className={styles.container}>
                <div className="header">
                    <h1>Find Dining</h1>
                    <Link className={styles.skip} href="/home">
                        Skip
                    </Link>
                </div>
                <div className="sub-container">
                    <Image
                        src="/LogoCropped.png"
                        className="app-logo"
                        height="170"
                        width="250"
                        alt="logo"
                    />
                    <LoginForm
                        styles={styles}
                        setLoginData={setLoginData}
                        loginData={loginData}
                        errors={errors}
                        handleForgotPassword={handleForgotPassword}
                        handleLogin={handleLogin}
                        handleRegister={handleRegister}
                        validLogin={validLogin}
                    />
                    <ForgotPassword
                        styles={styles}
                        displayModal={displayModal}
                        setDisplayModal={setDisplayModal}
                        loginData={loginData}
                        setLoginData={setLoginData}
                        handleCancel={handleCancel}
                        handleForgotPassword={handleForgotPassword}
                        errors={errors}
                    />
                </div>
            </div>
        </div>
    );
}
