import Navbar from "./Navbar";
import Spinner from "./Spinner";
import { useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

const Layout = ({ children }) => {
    const libraries = useMemo(() => ["places"], []);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });
    return (
        <>
            {isLoaded ? (
                <>
                    <Navbar />
                    <main>{children}</main>
                </>
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default Layout;
