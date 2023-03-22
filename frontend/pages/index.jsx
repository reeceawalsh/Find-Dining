import Head from "next/head";
import Login from "@component/components/Login";
import ThirdPartyLogin from "@component/components/ThirdPartyLogin";

export default function LandingPage() {
    return (
        <>
            <Head>
                <title>Find Dining</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                ></meta>
            </Head>
            <Login />
            <ThirdPartyLogin />
        </>
    );
}
