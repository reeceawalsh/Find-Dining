import Login from "@component/components/Login";
import ThirdPartyLogin from "@component/components/ThirdPartyLogin";
import { useRouter } from "next/router";
import { useUser } from "@component/lib/authContext";
import { useEffect } from "react";
export default function login() {
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
            <Login display />
            {/* <ThirdPartyLogin /> */}
        </div>
    );
}
