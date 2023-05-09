import Header from "@component/components/Header";
import SupportLink from "@component/components/SupportLink";
import styles from "./styles/support.module.css";

// this support component is in use on the profile page.
export default function Support() {
    return (
        <div className="profileContainer">
            <Header name="Support" />
            <div className={styles.supportLinks}>
                {/* this link can be clicked and will open outlook for the user on their device. */}
                <SupportLink
                    title="Contact Us"
                    link="mailto:finddiningcontact@gmail.com"
                    description="Need help with something specific? Reach out to us directly."
                />
                {/* this link takes the user to a feedback survey made with surveymonkey */}
                <SupportLink
                    title="Feedback Survey"
                    link="https://www.surveymonkey.co.uk/r/SWPLSD7"
                    description="Let us know how we can improve your experience with our website."
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
