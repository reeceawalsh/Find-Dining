// Restaurant Info Page
import Link from "next/link";
import { useRouter } from "next/router";

export default function RestaurantInfo() {
    const router = useRouter();

    return (
        <div className="container">
            <h1>Restaurant Info Page</h1>
            <Link className="link" href={`${router.asPath}/reviews`}>
                Reviews
            </Link>
            <Link className="link" href={`${router.asPath}/writereview`}>
                Write Review
            </Link>
        </div>
    );
}
