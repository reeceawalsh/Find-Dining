import styles from "./styles/aboutUs.module.css";
import Image from "next/image";

// this component displays information describing the project and giving some information about our team
const AboutUs = () => {
    const logo = require("../public/LogoCropped.png");

    return (
        <div className="support-container">
            <h1>About Us</h1>
            <p>
                Welcome to our restaurant discovery application! We are a team
                of passionate developers who have created an innovative solution
                to help users explore and find restaurants that are nearby. Our
                goal is to provide a seamless and user-friendly experience for
                discovering and selecting restaurants based on your preferences.
            </p>
            <p>
                Our application allows you to easily view restaurants on a map
                and as a list, making it convenient for you to find restaurants
                in your vicinity. You can also filter restaurants by cuisine, so
                you can quickly narrow down your search based on your desired
                culinary preferences.
            </p>
            <p>
                In order to ensure that our users have access to accurate and
                up-to-date information, we consolidate data from multiple
                sources, including APIs from renowned websites such as Google
                Maps. This allows us to provide you with reliable information
                about restaurants, including ratings, reviews, and other
                relevant details.
            </p>
            <p>
                Thank you for choosing{" "}
                <a href="/restaurants" className="orange-font">
                    Find Dining
                </a>
                {""}. We hope you enjoy using it and discovering new culinary
                experiences in your area! If you have any feedback or
                suggestions, please don't hesitate to contact us.
            </p>
            <Image
                className={styles.logo}
                src={logo}
                alt="Find Dining Logo - A very cute burger with a knife and fork."
            />
        </div>
    );
};

export default AboutUs;
