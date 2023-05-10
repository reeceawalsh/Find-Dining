import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// password input used in the registration form, login form and account details, if there is an error message in the props it will display them as a span and also outline the input in red.
const PasswordInput = (props) => {
    // controls if the password is shown or displaying asterixes'
    const [showPassword, setShowPassword] = useState(false);

    // handles pressing the eye icon which will toggle password to be shown or not shown
    const toggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="form-group">
                <span
                    className={`error password-error ${
                        !props.error ? "hidden" : ""
                    }`}
                >
                    {props.error}
                </span>
                <div className="form-sub-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        name={props.name}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        className={`form-control password-input ${
                            props.errors ? "red-outline" : ""
                        }`}
                        autoComplete={props.autoComplete}
                    />
                    <div
                        className="eye-icon"
                        data-testid="eye-button"
                        onClick={(e) => toggleShowPassword(e)}
                    >
                        {showPassword ? (
                            <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                            <FontAwesomeIcon icon={faEye} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordInput;
