import Header from "@component/components/Header";
import SupportLink from "@component/components/SupportLink";
import { useUser } from "@component/lib/authContext";
import styles from "./styles/support.module.css";

export default function Support() {
    return (
        <div className="profileContainer">
            <Header name="Support" />
            <div className={styles.supportLinks}>
                <SupportLink
                    title="Contact Us"
                    link="mailto:finddiningcontact@gmail.com"
                    description="Need help with something specific? Reach out to us directly."
                />
                <SupportLink
                    title="App Feedback"
                    link="https://www.surveymonkey.co.uk/r/SWPLSD7"
                    description="Let us know how we can improve your experience with our app."
                />
                <SupportLink
                    title="Privacy Policy"
                    link="/home/privacypolicy"
                    description="Read about our commitment to your privacy."
                />
                <SupportLink
                    title="Terms of Use"
                    link="/home/termsofuse"
                    description="Understand the terms and conditions of using our app."
                />
            </div>
        </div>
    );
}
