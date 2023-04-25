import { useUser } from "@component/lib/authContext";
import Layout from "../../components/Layout";
import SearchBar from "@component/components/SearchBar";
import styles from "./styles/home.module.css";
import {Stack} from "@mui/material";
import HistoryItem from "./historyItem";

export default function History({historyLists}) {
    const { user, loading } = useUser();

    return (
        <Layout>
            <div className="container">
                {/* <Header name="Find Dining" /> */}
                {user ? (
                    <div>
                        <Stack direction="column" spacing={2}>
                            {
                                historyLists.map((item, index) => {
                                    // eslint-disable-next-line react/jsx-key
                                        return <HistoryItem item={{item}}></HistoryItem>
                                    })
                            }
                        </Stack>
                    </div>
                ) : (
                    <div>
                        <h1 className={styles.welcomeMessage}>
                            Please login or register to access your history.
                        </h1>
                    </div>
                )}
                {/*<div className={styles.searchSection}>*/}
                {/*    <h2>Input your location to find restaurants near you.</h2>*/}
                {/*    <SearchBar />*/}
                {/*</div>*/}
            </div>
        </Layout>
    );
}