import Register from "@component/components/Register";
import Layout from "@component/components/Layout";
import { useRouter } from "next/router";
import { useUser } from "@component/lib/authContext";
import { useEffect } from "react";

export default function register() {
    const router = useRouter();
    const { user, loading } = useUser();

    useEffect(() => {
        // Redirect logged-in users to the homepage
        if (user) {
            router.push("/home");
        }
    }, [user, router]);
    return (
        <div>
            <Register />
        </div>
    );
}
