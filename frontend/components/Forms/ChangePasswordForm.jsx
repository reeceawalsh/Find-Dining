import PasswordInput from "../FormElements/PasswordInput";
import TextInput from "../FormElements/TextInput";

// change password form used by the changePasswordDialog component
export default function ChangePasswordForm({
    styles,
    setPasswordData,
    passwordData,
    errors,
    handleChangePassword,
    toggleDialog,
}) {
    return (
        <div>
            <form>
                <TextInput
                    className={styles.password}
                    name="Password"
                    type="password"
                    placeholder="Input your password"
                    value={passwordData.password}
                    onChange={(event) =>
                        setPasswordData({
                            ...passwordData,
                            password: event.target.value,
                        })
                    }
                    error={errors.password}
                    autocomplete="off"
                />
                <PasswordInput
                    className={styles.password}
                    name="New Password"
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    error={errors.newPassword}
                    autocomplete="off"
                    onChange={(event) =>
                        setPasswordData({
                            ...passwordData,
                            newPassword: event.target.value,
                        })
                    }
                />
                <PasswordInput
                    className={styles.password}
                    name="Confirm Password"
                    placeholder="Confirm Password"
                    value={passwordData.confirmPassword}
                    error={errors.confirmPassword}
                    autocomplete="off"
                    onChange={(event) =>
                        setPasswordData({
                            ...passwordData,
                            confirmPassword: event.target.value,
                        })
                    }
                />
                <button
                    className={styles.button}
                    onClick={handleChangePassword}
                    data-testid="change-password-button"
                >
                    Change Password
                </button>
                <button
                    className={styles.button}
                    onClick={toggleDialog}
                    data-testid="back-button"
                >
                    Back
                </button>
            </form>
        </div>
    );
}
