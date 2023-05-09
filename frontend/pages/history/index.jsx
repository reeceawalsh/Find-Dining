import { useUser } from "@component/lib/authContext";
import Layout from "../../components/Layout";
import SearchBar from "@component/components/SearchBar";
import styles from "./styles/history.module.css";
import {Stack} from "@mui/material";
import HistoryItem from "./historyItem";

export default function History() {
    const { user, loading } = useUser();

    return (
        <Layout>
            <div className="container">
                {/* <Header name="Find Dining" /> */}
                {/*{user ? (*/}
                {/*    <div>*/}
                {/*        <Stack direction="column" spacing={2}>*/}
                {/*            {*/}
                {/*                historyLists.map((item, index) => {*/}
                {/*                    // eslint-disable-next-line react/jsx-key*/}
                {/*                        return <HistoryItem item={{item}}></HistoryItem>*/}
                {/*                    })*/}
                {/*            }*/}
                {/*        </Stack>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <div>*/}
                {/*        <h1 className={styles.welcomeMessage}>*/}
                {/*            Please login or register to access your history.*/}
                {/*        </h1>*/}
                {/*    </div>*/}
                {/*)}*/}

                {
                    (
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
                    )
                }
            </div>
        </Layout>
    );
}