import Link from "next/link";
import { useUser } from "@component/lib/authContext";
import { useRouter } from "next/router";

const Navbar = () => {
    const { user, loading, logout } = useUser();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/home");
    };

    return (
        <div className="navbar">
            {loading ? (
                <span>Loading...</span>
            ) : user ? (
                <>
                    <Link className="link" href="/profile">
                        Profile
                    </Link>
                    <a className="link" onClick={handleLogout}>
                        Logout
                    </a>
                </>
            ) : (
                <>
                    <Link className="link" href="/login">
                        Login
                    </Link>
                    <Link className="link" href="/register">
                        Register
                    </Link>
                </>
            )}
        </div>
    );
};

export default Navbar;
