import React from "react";
import Header from "@component/components/Header";
import SupportLink from "@component/components/SupportLink";
import { useState } from "react";
import Layout from "@component/components/Layout";
import { useUser } from "@component/lib/authContext";
import styles from "./styles/support.module.css";

export default function Support() {
    const { user, loading } = useUser();

    return (
        <div>
            <Header name="Support" />
            <div className="info-section-container">
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
    );
}
