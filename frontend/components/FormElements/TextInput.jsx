const TextInput = (props) => {
    return (
        <div className="form-group">
            <span className={`error ${!props.error ? "hidden" : ""}`}>
                {props.error}
            </span>
            <input
                type="text"
                name={props.name}
                value={props.value || ""}
                className={`form-control ${props.error ? "red-outline" : ""}`}
                placeholder={props.placeholder}
                onChange={props.onChange}
                readOnly={!props.editable}
            />
            {props.hasEditButton && (
                <button onClick={props.onToggleEditable}>
                    {props.editable ? "Save" : "Edit"}
                </button>
            )}
        </div>
    );
};

export default TextInput;
