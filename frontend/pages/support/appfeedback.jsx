import Header from "@component/components/Header";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";

// Privacy Notice Page
export default function AppFeedback() {
    return (
        <div className="container">
            <Header name="App Feedback Page" />
            <div className="content-body">
                <div id="panel" className="panel-container">
                    <strong>
                        How satisfied are you with our Find Dining App?
                    </strong>
                    <div className="ratings-container">
                        <div className="rating">
                            <SentimentVeryDissatisfiedIcon className="icon_sat_1" />
                            <br />
                            <small>Unhappy</small>
                        </div>

                        <div className="rating">
                            <SentimentSatisfiedIcon className="icon_sat_2" />
                            <br />
                            <small>Neutral</small>
                        </div>

                        <div className="rating">
                            <TagFacesIcon className="icon_sat_3" />
                            <br />
                            <small>Satisfied</small>
                        </div>
                    </div>

                    <div>
                        <label for="freeform">Tell us more if you want:</label>
                        <br />
                        <textarea
                            id="freeform"
                            name="freeform"
                            rows="4"
                            cols="50"
                            placeholder="Enter text here..."
                            className="feedback-textarea    "
                        ></textarea>
                        <br />
                        <br />
                    </div>
                    <button className="btn" id="send">
                        Send Review
                    </button>
                </div>
            </div>
        </div>
    );
}
