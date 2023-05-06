import ProfileTextInput from "./FormElements/ProfileTextInput";

// this component contains text inputs that allow the user to change their username and email address
const AccountInfoSection = ({
    isEditable,
    formData,
    handleInputChange,
    loading,
    user,
}) => {
    return (
        <div className="info-section-container">
            <div className="info-section-item">
                {loading ? (
                    <span>Loading...</span>
                ) : (
                    user && (
                        <div>
                            <p>Username:</p>
                            <ProfileTextInput
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                editable={isEditable}
                                className={isEditable ? "blue-outline" : ""}
                            />

                            <p>Email:</p>
                            <ProfileTextInput
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                editable={isEditable}
                                className={isEditable ? "blue-outline" : ""}
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default AccountInfoSection;
