const DateInput = (props) => {
    const [showError, setShowError] = useState(true);

    const handleCloseError = () => {
        setShowError(false);
    };

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
