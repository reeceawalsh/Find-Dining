import { getUserFromLocalCookie } from "./auth";
const axios = require("axios");

const postReview = async ({ reviewData, token, restaurantID }) => {
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}api/reviews`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        data: {
            review: { reviewData },
            reviewer: await getUserFromLocalCookie(),
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
