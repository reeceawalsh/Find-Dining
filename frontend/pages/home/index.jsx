import { useUser } from "@component/lib/authContext";
import Layout from "../../components/Layout";
import SearchBar from "@component/components/SearchBar";
import styles from "./styles/home.module.css";


export default function Home() {
    const { user, loading } = useUser();
    return (
            <Layout>
                <div className={styles.container}>
                    {/* <Header name="Find Dining" /> */}
                    {user ? (
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
                    )}
                    <div className={styles.searchSection}>
                        <h2>Input your location to find restaurants near you.</h2>
                        <SearchBar />
                    </div>
                </div>
            </Layout>
    );
}
