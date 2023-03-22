// Profile Page
import Link from "next/link";

export default function Profile() {
    return (
        <div className="container">
            <h1>Profile Page</h1>
            <Link className="link" href="/profile/dietaryrestrictions">
                Dietary Restrictions
            </Link>
            <Link className="link" href="/profile/achievements">
                Achievements
            </Link>
            <Link className="link" href="/profile/accountdetails">
                Account Details
            </Link>
            <Link className="link" href="/profile/support">
                Support
            </Link>
        </div>
    );
}
