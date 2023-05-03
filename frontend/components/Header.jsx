import styles from "./styles/header.module.css";

// this header component is used as a title block for some of the components, it requires a handleEdit and handleSave to allow the accountDetails page to handle changing user data.
const Header = ({ name, handleEdit, handleSave, editMode }) => {
    return (
        <header className={styles.container}>
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
        </header>
    );
};

export default Header;
