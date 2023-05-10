import axios from "axios";
const postReview = async (newReview) => {
    const data = { ...newReview };
    console.log(data);
    try {
        const response = await axios.post("/api/reviews", data);
        return response;
    } catch (error) {
        console.log(error);
        console.log(error.response.data);
        throw error;
    }
};

export default postReview;
