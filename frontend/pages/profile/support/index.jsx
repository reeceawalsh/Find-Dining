import React from "react";
import Header from "../../components/Header";
import SupportLink from "../../components/SupportLink";
import { useState } from "react";
import Layout from "@component/components/Layout";
import { useUser } from "@component/lib/authContext";

import styles from "./styles/support.module.css";

export default function Support() {
    const { user, loading } = useUser();

    return (
        <Layout user={user}>
            <div className={styles.container}>
                <Header name="Support" backButton />
                <div className={styles.linksContainer}>
                    <SupportLink
                        title="Contact Us"
                        link="/contact page not done yet"
                        description="Need help with something specific? Reach out to us directly."
                    />
                    <SupportLink
                        title="App Feedback"
                        link="/support/appfeedback"
                        description="Let us know how we can improve your experience with our app."
                    />
                    <SupportLink
                        title="Privacy Policy"
                        link="/privacy-policy.pdf not done yet, on github "
                        description="Read about our commitment to your privacy."
                    />
                    <SupportLink
                        title="Terms of Use"
                        link="/terms-of-use.pdf not done yet too, on github"
                        description="Understand the terms and conditions of using our app."
                    />
                </div>
            </div>
        </Layout>
    );
}
