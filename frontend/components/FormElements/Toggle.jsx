import styles from "./styles/toggle.module.css";

// this toggle takes 2 values, the selected value and a function called handleToggle
const Toggle = ({ value1, value2, selectedValue, handleToggle }) => {
    // handles toggle and passes the newValue (the other value) to the handleToggle function
    const handleClick = () => {
        const newValue = selectedValue === value1 ? value2 : value1;
        handleToggle(newValue);
    };

    // displays both values in a wrapper
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
