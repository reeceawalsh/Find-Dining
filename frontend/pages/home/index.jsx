// Home Page
import Link from "next/link";

export default function Home() {
    return (
        <div className="container">
            <h1>Home Page</h1>
            <Link className="link" href="/home/about">
                About
            </Link>
            <Link className="link" href="/home/favourites">
                Favourites
            </Link>
            <Link className="link" href="/home/search">
                Search
            </Link>
            <Link className="link" href="/home/setlocation">
                Set Location
            </Link>
        </div>
    );
}
