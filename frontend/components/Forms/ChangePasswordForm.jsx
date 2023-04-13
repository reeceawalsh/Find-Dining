import PasswordInput from "../FormElements/PasswordInput";
import TextInput from "../FormElements/TextInput";
import DateInput from "../FormElements/DateInput";

export default function ChangePassword({
    styles,
    setPasswordData,
    passwordData,
    errors,
    handleChangePassword,
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
                >
                    Change Password
                </button>
            </form>
        </div>
    );
}