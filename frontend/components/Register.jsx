import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useUser } from "@component/lib/authContext";
const Register = () => {
    const router = useRouter();

    // Get the user object from the auth context
    const { user } = useUser();
    console.log(user);

    useEffect(() => {
        // Redirect logged-in users to the homepage
        if (user) {
            router.push("/home");
        }
    }, [user, router]);

    return (
        <div>
            <h1>Registration Component</h1>
        </div>
    );
    // ... Rest of the component
};

export default Register;
