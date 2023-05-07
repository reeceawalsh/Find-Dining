import Navbar from "./Navbar";
import Spinner from "./Spinner";
import { useLoadScript } from "@react-google-maps/api";
import { useMemo, Suspense } from "react";
import Footer from "./Footer";
import styles from "./styles/layout.module.css";

// this component will encompass all other pages and display a spinner if the google maps api hasn't loaded yet. this is important as it will throw an error if it's rendered before loading.
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
                    <Suspense fallback={<Spinner />}>
                        <main className={styles.main}>{children}</main>
                    </Suspense>
                    <Footer />
                </div>
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default Layout;
