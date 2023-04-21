import styles from "./styles/toggle.module.css";

const Toggle = ({ value1, value2, selectedValue, handleToggle }) => {
    const handleClick = () => {
        const newValue = selectedValue === value1 ? value2 : value1;
        handleToggle(newValue);
    };

    return (
        <div className={styles.toggleWrapper} onClick={handleClick}>
            <span
                className={`${styles.toggleValue} ${
                    selectedValue === value1 ? styles.selectedValue : ""
                }`}
            >
                {value1}
            </span>
            <span
                className={`${styles.toggleValue} ${
                    selectedValue === value2 ? styles.selectedValue : ""
                }`}
            >
                {value2}
            </span>
        </div>
    );
};

export default Toggle;
