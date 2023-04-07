import { useState } from "react";
import Image from "next/image";
import useSetToken from "@component/lib/useSetToken";

import Link from "next/link";
import styles from "./styles/login.module.css";
import validate from "../validationRules/LoginVR";
import LoginForm from "./Forms/LoginForm";
import ForgotPassword from "./Modals/ForgotPassword";
import axios from "axios";

const Login = () => {
    // loginDetails are details the user inputs before validation
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState([]);
    const [validLogin, setValidLogin] = useState(true);
    const [displayModal, setDisplayModal] = useState(false);
    const setToken = useSetToken();

    const handleLogin = (e) => {
        console.log("loginProcess");
        e.preventDefault();

        // runs validation on the logindetails
        let newErrors = checkErrors(loginData);

        // if there are no errors...
        if (Object.keys(newErrors).length === 0) {
            handleCheckUser();
        } else {
            console.log("errors");
            setLoginData({ email: "", password: "" });
        }
    };

    const handleCheckUser = () => {
        console.log("checking user");
        const token =
            "853026529cdea7d5f74ced9350fed93bcd88245bf2be9d213ec035b2c99907ed9fef5fd0d40b5ef8d1fcc74b27e7f24bf115a8b324c4263346dbb4ea8bf3a987f5e7783a5db09c18cc80baec220ae4804af218622a86c7b16ce3968f1ef82b3f24f353f67f2088dfdc994c4ade2403ac6e2641a729d724c7e791e879da66a811";
        let data = JSON.stringify({
            identifier: loginData.email,
            password: loginData.password,
        });

        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:1337/api/auth/local",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setToken(response.data);
                setValidLogin(true);
            })
            .catch(function (error) {
                console.error(error);
                setValidLogin(false);
            });
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
                        height="190"
                        width="290"
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
};

export default Login;
