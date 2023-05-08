import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="form-group">
                <span className={`error ${!props.error ? "hidden" : ""}`}>
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
                            props.error ? "red-outline" : ""
                        }`}
                        autoComplete={props.autoComplete}
                    />

                    <div
                        className="eye-icon"
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
