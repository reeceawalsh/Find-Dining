import { useState, useEffect } from "react";
import useSetToken from "@component/lib/useSetToken";
import { useRouter } from "next/router";
import { useUser } from "@component/lib/authContext";
import styles from "./styles/register.module.css";
import validate from "../validationRules/RegistrationVR";
import RegistrationForm from "./Forms/RegistrationForm";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
const logo = require("../public/LogoCropped.png");

const Register = () => {
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            router.push("/home");
        }
    }, [user, router]);

    const [registrationData, setRegistrationData] = useState({
        username: "",
        email: "",
        password: "",
        dateOfBirth: "",
    });

    const [errors, setErrors] = useState([]);
    const [validRegistration, setValidRegistration] = useState(false);
    const setToken = useSetToken();

    const handleRegister = (e) => {
        console.log("registration Process");
        e.preventDefault();

        // runs validation on the registration details
        let newErrors = checkErrors(registrationData);

        // if there are no errors...
        if (Object.keys(newErrors).length === 0) {
            handleCheckRegistered();
        } else {
            console.log("errors", newErrors);
            setErrors(newErrors);
        }
    };
    // Posts email, username, password and DOB to be added to Database
    const handleCheckRegistered = () => {
        console.log("checking user");
        const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN;
        let data = JSON.stringify({
            email: registrationData.email,
            username: registrationData.username,
            password: registrationData.password,
            dateOfBirth: registrationData.dateOfBirth,
        });
        console.log(data);

        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
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
                setValidRegistration(true);
            })
            .catch(function (error) {
                console.error("Request failed with status code 400");
                if (error.response) {
                    console.error("Server response:", error.response.data);
                }
                setValidRegistration(false);
            });
    };

    const checkErrors = (data) => {
        let newErrors = validate(data);
        setErrors(newErrors);
        return newErrors;
    };

    return (
        <div
            className={`container blue-background black-text border-bottom-white`}
        >
            <div className={`${styles.container}`}>
                <div className={styles.header}>
                    <Link href="/home">
                        <Image
                            className={`logo app-logo ${styles.logo}`}
                            src={logo}
                            alt="Find Dining Logo - A very cute burger with a knife and fork."
                            priority="true"
                        />
                    </Link>
                    <Link className={styles.skip} href="/home">
                        Home
                    </Link>
                </div>
                <div
                    className={`sub-container peach-background ${styles.registrationContainer}`}
                >
                    <h1 className={styles.title}>Sign Up</h1>
                    <RegistrationForm
                        styles={styles}
                        setRegistrationData={setRegistrationData}
                        registrationData={registrationData}
                        errors={errors}
                        handleRegister={handleRegister}
                        validRegister={validRegistration}
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
