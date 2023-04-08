import styles from "./styles/mobilenavbar.module.css";

export default function Navbar() {
    return (
        <div className={styles.navbarContainer}>
            <nav className={styles.navbar}>
                <a href="../home" className={styles.icons}>
                    <img src="/homeIconWhite.svg" className={styles.icons} />
                </a>
                <a href="../home/search" className={styles.icons}>
                    <img src="/searchIconWhite.svg" className={styles.icons} />
                </a>
                <a href="../profile/achievements" className={styles.icons}>
                    <img src="/awardIconWhite.svg" className={styles.icons} />
                </a>
                <a href="../profile/" className={styles.icons}>
                    <img src="/userIconWhite.svg" className={styles.icons} />
                </a>
            </nav>
        </div>
    );
}

export default function Navbar() {
    return (
        <div className={styles.navbarContainer}>
            <nav className={styles.navbar}>
                    <a href="../home" className={styles.icons}><img src="/homeIconWhite.svg" className={styles.icons}/></a>
                    <a href="../home/search" className={styles.icons}><img src="/searchIconWhite.svg" className={styles.icons}/></a>
                    <a href="../profile/achievements" className={styles.icons}><img src="/awardIconWhite.svg" className={styles.icons}/></a>
                    <a href="../profile/" className={styles.icons}><img src="/userIconWhite.svg" className={styles.icons}/></a>
            </nav>
        </div>
    )
}