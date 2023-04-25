import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/restaurantPage.module.css";
import StarRating from "./StarRating";
import OpeningHours from "./OpeningHours";
import haversineDistance from "@component/lib/haversineDistance";
import RestaurantAddress from "./RestaurantAddress";
import RestaurantReview from "./RestaurantReview";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useRef } from "react";
import getOffsetTop from "@component/lib/getOffsetTop";
// import reviewsData from "../lib/reviewsData.json";
import { useCookies } from "react-cookie";
import { getTokenFromLocalCookie } from "@component/lib/auth";
import InteractiveStarRating from "./InteractiveStarRating";
import { useUser } from "@component/lib/authContext";
import fetchRestaurantReviews from "@component/lib/fetchRestaurantReviews";

const RestaurantPage = ({
    restaurant,
    reviews,
    setReviews,
    strapiRestaurantDetails,
}) => {
    const {
        name,
        image_url,
        photos,
        display_phone,
        location,
        price,
        rating,
        review_count,
        url,
        hours,
        coordinates,
        categories,
    } = restaurant;

    const [cookies] = useCookies(["jwt"]);
    const reviewsRef = useRef(null);
    const writeReviewRef = useRef(null);
    const [token, setToken] = useState(null);
    const [review, setReview] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);
    const [distance, setDistance] = useState(null);
    const [mapCenter, setMapCenter] = useState({
        lat: coordinates.latitude,
        lng: coordinates.longitude,
    });

    const { user } = useUser();

    const getDistance = () => {
        const restaurantLat = coordinates.latitude;
        const restaurantLng = coordinates.longitude;

        const distanceAwayFromUser = haversineDistance(
            restaurantLat,
            restaurantLng
        );
        return `${Math.round(distanceAwayFromUser)} metres`;
    };

    // handles scrolling to the correct section, writeReview not currently in use.
    useEffect(() => {
        const hash = window.location.hash;
        let targetElement;
        const scrollToTargetElement = () => {
            switch (hash) {
                case "#reviews":
                    targetElement = reviewsRef.current;
                    break;
                case "#writeReview":
                    targetElement = writeReviewRef.current;
                    break;
            }
            if (hash && targetElement) {
                window.scrollTo({
                    top: getOffsetTop(targetElement),
                    behavior: "smooth",
                });
            }
        };
        if (document.readyState === "complete") {
            scrollToTargetElement();
        } else {
            window.addEventListener("load", scrollToTargetElement);
            return () =>
                window.removeEventListener("load", scrollToTargetElement);
        }
    }, []);

    // submits a review using the /api/addReview route
    const submitReview = async (review, token, rating) => {
        const Restaurant = strapiRestaurantDetails.id;
        const User = user.id;
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/addReview?review=${review}&Restaurant=${Restaurant}&User=${User}&rating=${rating}&token=${token}`
            );

            if (response.status === 201) {
                const newReview = response.data.data;
                console.log("Created new review:", newReview);

                // need to update the local reviews as they wont automatically change until page load
                setReviews((prevReviews) => [...prevReviews, newReview]);
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        submitReview(review, token, selectedRating);
        console.log("Submitted review:", review);
        setReview("");
        setSelectedRating(0);
    };

    useEffect(() => {
        setDistance(getDistance);
    }, []);

    console.log(reviews);

    useEffect(() => {
        setToken(getTokenFromLocalCookie(cookies));
    }, [cookies]);

    return (
        <div className="container">
            <header
                className={styles.header}
                style={{
                    backgroundImage: `url(${photos[0]}), url(${photos[1]})`,
                }}
            >
                <h1 className={styles.restaurantName}>{name}</h1>
                <div className={styles.headerRating}>
                    <StarRating rating={rating} />
                    <span>{review_count} reviews</span>
                </div>
                <div className={styles.headerInfo}>
                    <span>{price}</span>
                    <div className={styles.categories}>
                        {categories &&
                            categories.map((type, index) => (
                                <div key={index}>
                                    {categories.length - 1 == index ? (
                                        <p>{type.title}. </p>
                                    ) : (
                                        // ${"\u00A0"} is a white space character
                                        <p>{`${type.title},${"\u00A0"}`}</p>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </header>
            <div className={styles.restaurantInfo}>
                <div className={styles.subContainer}>
                    <div className={styles.leftContainer}>
                        <OpeningHours hours={hours} />
                        <p>{display_phone}</p>
                    </div>
                    <div className={styles.rightContainer}>
                        <RestaurantAddress location={location} />
                        <div className={styles.map}>
                            <GoogleMap
                                options={{
                                    disableDefaultUI: true,
                                    clickableIcons: true,
                                    scrollwheel: false,
                                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                                }}
                                zoom={18}
                                center={mapCenter}
                                mapContainerStyle={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                onLoad={() => console.log("Map loaded")}
                            >
                                <MarkerF
                                    position={{
                                        lat: coordinates.latitude,
                                        lng: coordinates.longitude,
                                    }}
                                />
                            </GoogleMap>
                        </div>
                        <p>Distance Away: {distance}</p>
                    </div>
                </div>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    View on Yelp
                </a>
            </div>
            <div
                id="reviews"
                ref={reviewsRef}
                className={styles.reviewsSection}
            >
                <h2>Reviews</h2>
                {reviews &&
                    reviews.map((review, index) => (
                        <div key={index} className={styles.review}>
                            <RestaurantReview review={review} />
                        </div>
                    ))}
            </div>
            <div id="writeReview" ref={writeReviewRef}>
                <form
                    className={styles.reviewForm}
                    onSubmit={handleSubmitReview}
                >
                    <h2>Submit your review</h2>
                    <InteractiveStarRating onRatingChange={setSelectedRating} />
                    <textarea
                        placeholder="Write your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RestaurantPage;
