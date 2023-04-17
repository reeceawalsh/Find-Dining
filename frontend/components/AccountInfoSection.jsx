import ProfileTextInput from "./FormElements/ProfileTextInput";

export default function AccountInfoSection({
    isEditable,
    formData,
    handleInputChange,
    loading,
    user,
}) {
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
                            <div className="info-section-item">
                                <p>Email:</p>
                                <ProfileTextInput
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    editable={isEditable}
                                    className={isEditable ? "blue-outline" : ""}
                                />
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
