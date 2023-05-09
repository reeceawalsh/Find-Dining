import styles from "./styles/achievements.module.css";

// NOT IN USE
// this component contains and presents achievement data.
const Achievement = ({ title, description, dateAchieved, progress }) => {
    return (
        <div className={styles.achievementContainer}>
            <h3>{title && title}</h3>
            <p>{description && description}</p>
            <p>{dateAchieved && dateAchieved}</p>
            <p>{progress && progress}</p>
        </div>
    );
};

export default Achievement;
