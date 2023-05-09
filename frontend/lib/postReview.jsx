const axios = require("axios");

// posts a review to the backend through the use of the api/reviews route
const postReview = async ({ reviewData, token, restaurantID, User }) => {
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/reviews`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        data: {
            review: { reviewData },
            reviewer: User,
            restaurant: restaurantID,
        },
    };

    axios
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
};

export default postReview;
