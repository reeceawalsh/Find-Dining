import styles from "./styles/socialLinkItem.module.css";
// NOT IN USE
export default function SocialLinkItem({
    icon,
    name,
    checkConnected,
    handleClickConnected,
}) {
    return (
        <div>
            <button className={styles.connect} onClick={handleClickConnected}>
                <div className={styles.left}>
                    <div className={styles.icon}>{icon}</div>
                    <div className={styles.name}>{name}</div>
                </div>
                <div className={styles.right}>
                    <div className={styles.connected}>
                        {checkConnected ? "Connected" : "Click To Connect"}
                    </div>
                </div>
            </button>
        </div>
    );
}
