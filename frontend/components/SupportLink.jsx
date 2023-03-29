import React from "react";
import styles from "./SupportLink.module.css";

const SupportLink = ({ title, body }) => {
  return (
    <div className={styles.supportLink}>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};

export default SupportLink;