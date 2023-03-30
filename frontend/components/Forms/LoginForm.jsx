import PasswordInput from "../FormElements/PasswordInput";
import TextInput from "../FormElements/TextInput";

export default function LoginForm({
    styles,
    setLoginData,
    loginData,
    errors,
    handleForgotPassword,
    handleLogin,
    handleRegister,
    validLogin,
}) {
    return (
        <div className={styles.loginForm}>
            <form>
                <TextInput
                    className={styles.email}
                    name="Email"
                    type="email"
                    placeholder="Input your email address"
                    value={loginData.email}
                    error={errors.email}
                    onChange={(event) =>
                        setLoginData({
                            ...loginData,
                            email: event.target.value,
                        })
                    }
                />
                <PasswordInput
                    className={styles.password}
                    name="Password"
                    placeholder="Input your password"
                    value={loginData.password}
                    error={errors.password}
                    onChange={(event) =>
                        setLoginData({
                            ...loginData,
                            password: event.target.value,
                        })
                    }
                />

                {/** Will display an error message if they login is unsuccessful. The error message is purposely vague. */}
                {!validLogin && (
                    <div>
                        <p className={styles.errorMessage}>
                            Invalid credentials
                        </p>
                    </div>
                )}

                <div className={styles.buttons}>
                    <button
                        className={styles.button}
                        type="submit"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <button className={styles.button} onClick={handleRegister}>
                        Register
                    </button>
                    <button
                        className={styles.button}
                        type="submit"
                        onClick={handleForgotPassword}
                    >
                        Forgot Password
                    </button>
                </div>
            </form>
        </div>
    );
}
