import React from "react";
import styles from "./styles/header.module.css";

export default function Header({ name, handleEdit, handleSave, editMode }) {
    return (
        <div className={styles.container}>
            <p></p>
            <h1 className={styles.title}>{name && name}</h1>
            {handleSave && handleEdit ? (
                !editMode ? (
                    <button onClick={handleEdit} className={styles.button}>
                        Edit
                    </button>
                ) : (
                    <button onClick={handleSave} className={styles.button}>
                        Save
                    </button>
                )
            ) : (
                <p></p>
            )}
        </div>
    );
}
