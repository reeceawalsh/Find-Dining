import styles from "./styles/support.module.css";

// this support link is used by the support page
const SupportLink = ({ title, link, description }) => {
    return (
        <div className={styles.linkContainer}>
            <a href={link} className={styles.link}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </a>
        </div>
    );
};

export default SupportLink;
