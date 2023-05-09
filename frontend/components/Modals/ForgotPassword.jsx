import TextInput from "../FormElements/TextInput";

// this modal appears when the user clicks the forgot password link
const ForgotPassword = ({
    styles,
    displayModal,
    setDisplayModal,
    loginData,
    setLoginData,
    handleCancel,
    handleForgotPassword,
    errors,
}) => {
    if (displayModal) {
        return (
            <div
                className="modal-container"
                onClick={() => setDisplayModal(!displayModal)}
            >
                <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="modal_title">Forgot Password</h3>
                    <p className="modal_text">
                        Please enter your email to reset your password. If you
                        are a registered member we will send you a reset link.
                    </p>
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
                    <div className="button_container">
                        <button
                            className="forgot-password-btn"
                            type="submit"
                            onClick={handleForgotPassword}
                        >
                            Reset Password
                        </button>
                        <button
                            className="forgot-password-btn cancel-btn"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default ForgotPassword;
