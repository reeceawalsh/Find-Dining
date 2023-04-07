import React from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from '@mui/material/Button';
import styles from "./styles/headerWithSave.module.css";

export default function HeaderWithSave(props) {
    return (
        <div className={`container ${styles.headerWithSaveContainer}`}>
            <div><KeyboardBackspaceIcon /></div>
            <div><h1>{props.name && props.name}</h1></div>
            <div><Button variant="text" size="large" color="primary">Save</Button></div>
        </div>
    );
}
