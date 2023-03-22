import Image from "next/image";
import Link from "next/link";
import styles from "./styles/login.module.css";

// variables
const wrongDetails = true;

export default function Login() {
    const login = () => {
        // send request to login
    };

    return (
        <div
            className={`container ${styles.Login__Container} blue-background black-text`}
        >
            <Link className={styles.title} href="/home">
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
            <div className={styles.Login__LoginForm}>
                <form onSubmit={login}>
                    <label>Email</label>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email Address"
                    />
                    <label>Password</label>
                    <input name="password" type="text" placeholder="Password" />
                    <div className={`${styles.Login__ErrorMessage} error`}>
                        {wrongDetails && <p>Incorrect login details.</p>}
                    </div>
                    <div className={styles.buttons}>
                        <button className="button" type="submit">
                            Login
                        </button>
                        <button className="button" type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
