import Image from "next/image";
import Link from "next/link";

// variables
const wrongDetails = true;

export default function Login() {
    const login = () => {
        // send request to login
    };

    return (
        <div className="container Login__Container blue-background black-text">
            <Link className="Login__Skip" href="/home">
                Skip
            </Link>
            <h1 className="title">Find Dining</h1>
            <Image
                src="/LogoCropped.png"
                className="app-logo"
                height="170"
                width="240"
                alt="logo"
            />
            <div className="Login__Login-form">
                <form onSubmit={login}>
                    <label>Email</label>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email Address"
                    />
                    <label>Password</label>
                    <input name="password" type="text" placeholder="Password" />
                    <div className="Login__Error-message">
                        {wrongDetails && <p>Incorrect login details.</p>}
                    </div>
                    <div className="Login__Buttons">
                        <button type="submit">Login</button>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
