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
            />
        </div>
    );
};

export default TextInputLabel;
