// date input used in the registration form, if there is an error message in the props it will display them as a span and also outline the input in red.
const DateInput = (props) => {
    return (
        <div>
            <div className="form-group">
                <span className={`error ${!props.error ? "hidden" : ""}`}>
                    {props.error}
                </span>

                <input
                    type="date"
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    min="0"
                    className={`form-control ${
                        props.error ? "red-outline" : ""
                    }`}
                />
            </div>
        </div>
    );
};

export default DateInput;
