// Landing page
import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="container">
            <Link className="link" href="/home">
                Home
            </Link>
            <Link className="link" href="/profile">
                Profile
            </Link>
            <Link className="link" href="/restaurants">
                Restaurants
            </Link>
            <Link className="link" href="/login">
                Login
            </Link>
            <Link className="link" href="/register">
                Register
            </Link>
        </div>
    );
}
