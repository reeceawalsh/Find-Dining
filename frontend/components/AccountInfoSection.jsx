import ProfileTextInput from "./FormElements/ProfileTextInput";

// this component contains text inputs that allow the user to change their username and email address
const AccountInfoSection = ({
    isEditable,
    formData,
    handleInputChange,
    loading,
    user,
    errors,
}) => {
    return (
        <div className="info-section-container">
            <div className="info-section-item">
                {loading ? (
                    <span>Loading...</span>
                ) : (
                    user && (
                        <div className="form-container">
                            <p>Username:</p>
                            <ProfileTextInput
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                editable={isEditable}
                                className={isEditable ? "blue-outline" : ""}
                                errors={errors.username}
                            />

                            <p>Email:</p>
                            <ProfileTextInput
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                editable={isEditable}
                                className={isEditable ? "blue-outline" : ""}
                                errors={errors.email}
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default AccountInfoSection;
