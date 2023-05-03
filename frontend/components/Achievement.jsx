import styles from "./styles/achievements.module.css";

// this component contains and presents achievement data.
const Achievement = ({ title, description, dateAchieved, progress }) => {
    return (
        <div className={`container ${styles.achievementContainer}`}>
            <h1>{title && title}</h1>
            <p>{description && description}</p>
            <p>{dateAchieved && dateAchieved}</p>
            <p>{progress && progress}</p>
        </div>
    );
};

export default Achievement;
