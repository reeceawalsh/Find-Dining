import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "@mui/material/Button";
import styles from "./styles/headerWithSave.module.css";

export default function HeaderWithSave({
    name,
    handleEdit,
    handleSave,
    editMode,
}) {
    return (
        <div className={`container ${styles.headerWithSaveContainer}`}>
            <div>
                <KeyboardBackspaceIcon />
            </div>
            <div>
                <h1>{name && name}</h1>
            </div>
            <div>
                {!editMode ? (
                    <Button
                        variant="text"
                        size="large"
                        color="primary"
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>
                ) : (
                    <Button
                        variant="text"
                        size="large"
                        color="primary"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                )}
            </div>
        </div>
    );
}
