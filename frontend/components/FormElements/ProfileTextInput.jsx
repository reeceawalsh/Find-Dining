// profile text input used in the account details form, if there is an error message in the props it will display them as a span and also outline the input in red. This form element is different from textInput because it includes editable props an editable button which will allow the user to edit the input.
const ProfileTextInput = (props) => {
    return (
        <div className="form-group">
            <span className={`error ${!props.errors ? "hidden" : ""}`}>
                {props.errors}
            </span>
            <input
                type="text"
                name={props.name}
                value={props.value || ""}
                className={`${props.className} form-control ${
                    props.error ? "red-outline" : ""
                }${!props.editable && "pointer"}`}
                placeholder={props.placeholder}
                onChange={props.onChange}
                readOnly={!props.editable}
                autoComplete={props.autoComplete}
            />
            {/* if theres an edit button in props then it will render one */}
            {props.hasEditButton && (
                <button onClick={props.onToggleEditable}>
                    {props.editable ? "Save" : "Edit"}
                </button>
            )}
        </div>
    );
};

export default ProfileTextInput;
