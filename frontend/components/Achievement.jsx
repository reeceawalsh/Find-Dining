import React from "react";
import styles from "./styles/achievements.module.css";

export default function Achievement({
    title,
    description,
    dateAchieved,
    progress,
}) {
    return (
        <div className={`container ${styles.achievementContainer}`}>
            <h1>{title && title}</h1>
            <p>{description && description}</p>
            <p>{dateAchieved && dateAchieved}</p>
            <p>{progress && progress}</p>
        </div>
    );
}
