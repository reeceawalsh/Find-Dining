import { useUser } from "@component/lib/authContext";
import Layout from "../../components/Layout";
import SearchBar from "@component/components/SearchBar";
import styles from "./styles/home.module.css";

// route -> /home
export default function Home() {
    return (
        <Layout>
            <div className={styles.container}>
                {/* <Header name="Find Dining" /> */}
                {/* {user ? (
                    <div>
                        <h1 className={styles.welcomeMessage}>
                            Hi {!loading ? user.username : "Loading..."}, I hope
                            you're hungry.
                        </h1>
                    </div>
                ) : (
                    <div>
                        <h1 className={styles.welcomeMessage}>
                            Please login or register to access your profile.
                        </h1>
                    </div>
                )} */}
                <div className={styles.searchSection}>
                    <SearchBar />
                </div>
            </div>
        </Layout>
    );
}
