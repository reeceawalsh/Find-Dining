import Header from "@component/components/Header";
import { useState } from "react";
import Layout from "@component/components/Layout";
import { useUser } from "@component/lib/authContext";

// Privacy Notice Page
export default function PrivacyNotice() {
    const { user, loading } = useUser();

    return (
        <div className="container">
            <Header name="Privacy Notice Page" />
            <div className="content-body">
                <p>
                    At Find Dining, we are committed to protecting your privacy
                    and personal data. This privacy notice explains how we
                    collect, use, and protect your personal information when you
                    use our restaurant search app.
                </p>
                <br></br>
                <h2>What information do we collect?</h2>
                <br></br>
                When you use our restaurant search app, we may collect the
                following information:
                <br></br>
                <ul>
                    <li>Your device's unique identifier</li>
                    <li>Your location</li>
                    <li>Your search history and preferences</li>
                    <li>
                        Your interactions with the app, such as clicks and
                        swipes
                    </li>
                </ul>
                <br></br>
                <h2>How do we use your information?</h2>
                <br></br>
                We use your information to provide you with a personalized
                restaurant search experience. This includes:
                <br></br>
                <ul>
                    <li>
                        Displaying relevant search results based on your
                        location and preferences
                    </li>
                    <li>
                        Improving the app's functionality and user experience
                    </li>
                    <li>
                        Analyzing user behavior to better understand how people
                        use the app
                    </li>
                </ul>
                <br></br>
                <h2>How do we protect your information?</h2>
                <br></br>
                We take the security of your information seriously and have
                implemented appropriate measures to ensure its protection. We
                use industry-standard encryption to safeguard your data during
                transmission, and we regularly review our security practices to
                ensure that your information is safe.
                <br></br>
                <br></br>
                <h2>Will we share your information with third parties?</h2>
                <br></br>
                We do not sell or share your personal information with third
                parties, except as required by law or as necessary to provide
                you with the services offered by our app.
                <br></br>
                <br></br>
                <h2>How long do we keep your information?</h2>
                <br></br>
                We retain your information for as long as necessary to provide
                you with the services offered by our app and for the purposes
                outlined in this privacy notice. If you would like us to delete
                your information, please contact us using the information
                provided below.
                <br></br>
                <br></br>
                <h2>Changes to this privacy notice</h2>
                <br></br>
                We may update this privacy notice from time to time to reflect
                changes in our data processing practices. If we make significant
                changes, we will notify you by email or through the app.
                <br></br>
                <br></br>
                <h2>Contact us</h2>
                <br></br>
                If you have any questions or concerns about this privacy notice,
                please contact us at [Insert Contact Information].
                <br></br>
                <br></br>
                Last updated: 3 April 2023
            </div>
        </div>
    );
}
