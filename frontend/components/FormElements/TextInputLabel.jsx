// text input used in most of the forms, if there is an error message in the props it will display them as a span and also outline the input in red. Also has a label if required.
const TextInputLabel = (props) => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <input
                type="text"
                name={props.name}
                value={props.value}
                className="form-control required"
                placeholder={props.placeholder}
                onChange={props.onChange}
                autoComplete={props.autoComplete}
            />
        </div>
    );
};

export default TextInputLabel;
