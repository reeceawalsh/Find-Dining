import Navbar from "./Navbar";
import Spinner from "./Spinner";
import { useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import Footer from "./Footer";
import styles from "./styles/layout.module.css";

const Layout = ({ children }) => {
    const libraries = useMemo(() => ["places"], []);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });
    return (
        <>
            {isLoaded ? (
                <div className={styles.pageContainer}>
                    <Navbar />
                    <main className={styles.main}>{children}</main>
                    <Footer />
                </div>
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default Layout;
