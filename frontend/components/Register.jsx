import { useState, useEffect } from "react";
import useSetToken from "@component/lib/useSetToken";
import { useRouter } from "next/router";
import { useUser } from "@component/lib/authContext"
import styles from "./styles/register.module.css";
import validate from "../validationRules/RegistrationVR";
import RegistrationForm from "./Forms/RegistrationForm";
import axios from "axios";


const Register = () => {

    const router = useRouter()
    const { user } = useUser();
    console.log(user);

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
            console.log("errors");
            setRegistrationData({username: "", email: "", password: "", dateOfBirth: ""});
        }
    };


    // Posts email, username, password and DOB to be added to Database
    const handleCheckRegistered = () => {
        console.log("checking user");
        const token =
            "853026529cdea7d5f74ced9350fed93bcd88245bf2be9d213ec035b2c99907ed9fef5fd0d40b5ef8d1fcc74b27e7f24bf115a8b324c4263346dbb4ea8bf3a987f5e7783a5db09c18cc80baec220ae4804af218622a86c7b16ce3968f1ef82b3f24f353f67f2088dfdc994c4ade2403ac6e2641a729d724c7e791e879da66a811";
        let data = JSON.stringify({
            identifier: registrationData.email,
            username: registrationData.username,
            password: registrationData.password,
            dateOfBirth: registrationData.dateOfBirth,
        });

        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:1337/api/auth/local/register",
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
            console.error(error);
            setValidRegistration(false);
        });
    };

    const checkErrors = (data) => {
        let newErrors = validate(registrationData);
        setErrors(newErrors);
        return newErrors;
    };

    return (
        <div>
            <RegistrationForm
            styles={styles}
            setRegistrationData={setRegistrationData}
            registrationData={registrationData}
            errors={errors}
            handleRegister={handleRegister}
            validRegister={validRegistration}
            />
        </div>
    );
};

export default Register;
