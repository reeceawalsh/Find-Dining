import PasswordInput from "../FormElements/PasswordInput"
import TextInput from "../FormElements/TextInput"
import DateInput from "../FormElements/DateInput"

export default function RegistrationForm({
    styles,
    setRegistrationData,
    registrationData,
    errors,
    handleRegister,
    alreadyRegistered
}) {
    return (
        <div>
            <form>
                <TextInput
                    className={styles.username}
                    name="Username"
                    type="text"
                    placeholder="Username"
                    value={registrationData.username}
                    error={errors.username}
                    onChange={(event) =>
                        setRegistrationData({
                            ...registrationData,
                            username: event.target.value
                        })
                    }
                />
                <TextInput
                    className={styles.email}
                    name="Email"
                    type="email"
                    placeholder="Email"
                    value={registrationData.email}
                    error={errors.email}
                    onChange={(event) =>
                        setRegistrationData({
                            ...registrationData,
                            email: event.target.value
                        })
                    }
                />
                {alreadyRegistered && (
                    <div>
                        <p>An account with this email address already exists.</p>
                    </div>
                )}
                <DateInput
                    type="date"
                    name="Date of Birth"
                    placeholder="Date of Birth (dd/mm/yy)"
                    value={registrationData.value}
                    error={errors.dateOfBirth}
                    onChange={(event) =>
                        setRegistrationData({
                            ...registrationData,
                            dateOfBirth: event.target.value
                        })}
                />
                <PasswordInput
                    className={styles.password}
                    name="Password"
                    placeholder="Password"
                    value={registrationData.password}
                    error={errors.password}
                    onChange={(event) =>
                        setRegistrationData({
                            ...registrationData,
                            password: event.target.value,
                        })
                    }
                />
                <button className={styles.button} onClick={handleRegister}>
                    Register
                </button>
            </form>
        </div>
    )
}