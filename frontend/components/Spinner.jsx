import Image from "next/image";
const logo = require("../public/LogoCropped.png");

// this spinner will display when loading, it can take a message but doesn't currently in any of the iterations.
const Spinner = ({ message }) => {
    return (
        <div className="spinnerWrapper">
            <div className="spinnerContainer">
                <div className="spinner"></div>
            </div>
            <div className="spinnerContainer">
                <Image
                    className="spinnerImage"
                    src={logo}
                    alt="Find Dining Logo - A very cute burger with a knife and fork."
                    priority="true"
                />
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Spinner;
