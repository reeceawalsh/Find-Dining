import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./styles/footer.module.css";
import NavLink from "./NavLink";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <NavLink className={styles.link} href="/contact-us">
                    Contact Us
                </NavLink>
                <NavLink className={styles.link} href="/customer-support">
                    Customer Support
                </NavLink>
                <NavLink className={styles.link} href="/about">
                    About This Project
                </NavLink>
            </div>
            <div className={styles.info}>
                <a
                    href="https://github.com/reeceawalsh/Find-Dining"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Find Dining
                </a>
                <div className={styles.githubIcon}>
                    <a
                        href="https://github.com/reeceawalsh/Find-Dining"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
