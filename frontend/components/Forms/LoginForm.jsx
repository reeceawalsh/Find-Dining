import PasswordInput from "../FormElements/PasswordInput";
import TextInput from "../FormElements/TextInput";

// login form used by the login component
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
        <div onSubmit={handleLogin} className={styles.loginForm}>
            <form data-testid="login-form">
                <TextInput
                    className={styles.email}
                    name="Identifier"
                    placeholder="Input your email or username."
                    value={loginData.identifier}
                    error={errors.identifier}
                    onChange={(event) =>
                        setLoginData({
                            ...loginData,
                            identifier: event.target.value,
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
                        disabled={!loginData.identifier || !loginData.password}
                        data-testid="login-button"
                    >
                        Login
                    </button>
                    <button
                        className={styles.button}
                        onClick={handleRegister}
                        data-testid="register-button"
                    >
                        Register
                    </button>
                    <button
                        className={styles.button}
                        onClick={handleForgotPassword}
                        data-testid="forgot-password-button"
                    >
                        Forgot Password
                    </button>
                </div>
            </form>
        </div>
    );
}
