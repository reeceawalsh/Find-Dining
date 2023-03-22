import styles from "./styles/thirdpartylogin.module.css";

export default function ThirdPartyLogin() {
    return (
        <div
            className={`container ${styles.ThirdPartyLogin__Container} peach-background`}
        >
            <h2>Continue with...</h2>
            <div className={styles.ThirdPartyLogin__Icons}>
                <h3>Facebook Icon</h3>
                <h3>Google Icon</h3>
                <h3>Instagram Icon</h3>
                <h3>Apple Icon</h3>
            </div>
        </div>
    );
}
