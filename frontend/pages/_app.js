import "@component/styles/globals.css";
import "../styles/reset.css";
import Head from "next/head";
import { UserProvider } from "@component/lib/authContext";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }) {
    return (
        <CookiesProvider>
            <UserProvider>
                <Head>
                    <title>Find Dining</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    ></meta>
                </Head>
                <Component {...pageProps} />
            </UserProvider>
        </CookiesProvider>
    );
}
