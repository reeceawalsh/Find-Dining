import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./styles/restaurantPage.module.css";
import StarRating from "./StarRating";
import OpeningHours from "./OpeningHours";
import RestaurantAddress from "./RestaurantAddress";
import RestaurantReview from "./RestaurantReview";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useRef } from "react";
import getOffsetTop from "@component/lib/getOffsetTop";
import { useCookies } from "react-cookie";
import { getTokenFromLocalCookie } from "@component/lib/auth";
import InteractiveStarRating from "./InteractiveStarRating";
import { useUser } from "@component/lib/authContext";
import haversineDistance from "@component/lib/haversineDistance";
import Location from "@component/lib/locationContext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";

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
        price,
        location,
        rating,
        review_count,
        url,
        hours,
        coordinates,
        categories,
    } = restaurant;
    const { user } = useUser();
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
    const [displayedReviewsCount, setDisplayedReviewsCount] = useState(5);
    const [filteredReviews, setFilteredReviews] = useState(reviews);

    const { geoLocation } = useContext(Location);

    const [error, setError] = useState(false);

    const getDistance = () => {
        const restaurantLat = coordinates.latitude;
        const restaurantLng = coordinates.longitude;

        const distanceAwayFromUser = haversineDistance(
            restaurantLat,
            restaurantLng,
            geoLocation
        );
        return `${Math.round(distanceAwayFromUser)} metres`;
    };

    console.log(distance);

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
        const reviewer = user.username;
        console.log(reviewer);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/addReview?review=${review}&Restaurant=${Restaurant}&User=${User}&rating=${rating}&token=${token}&reviewer=${reviewer}`
            );

            if (response.status === 201) {
                const newReview = response.data.data;
                console.log("Created new review:", newReview);

                // need to update the local reviews as they wont automatically change until page load
                setReviews((prevReviews) => [...prevReviews, newReview]);
                setFilteredReviews((prevFilteredReviews) => [
                    ...prevFilteredReviews,
                    newReview,
                ]);
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    };
    const getRatingCounts = () => {
        const ratingCounts = {};
        reviews.forEach((review) => {
            const rating = Math.round(review.rating);
            if (!ratingCounts[rating]) {
                ratingCounts[rating] = 1;
            } else {
                ratingCounts[rating]++;
            }
        });
        return ratingCounts;
    };

    const handleFilterChange = (rating) => {
        if (rating === "all") {
            setFilteredReviews(reviews);
        } else {
            const newFilteredReviews = reviews.filter(
                (review) => review.rating === rating
            );
            setFilteredReviews(newFilteredReviews);
        }
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (review && review.length > 10) {
            submitReview(review, token, selectedRating);
            console.log("Submitted review:", review);
            setReview("");
            setSelectedRating(0);
            setError(false);
        } else {
            setError(true);
        }
    };

    // will set the distance away when geoLocation changes
    useEffect(() => {
        setDistance(getDistance);
    }, [geoLocation]);

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
                    backgroundColor: "#48a7ff",
                    borderBottom: "1px solid #e34f4f",
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
                        <div className={styles.icon}>
                            <AccessTimeIcon
                                className={styles.icon}
                                fontSize="small"
                            />
                        </div>
                        <p>{display_phone}</p>
                        <a
                            className={styles.yelpLink}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on Yelp
                        </a>
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
            </div>
            {user && filteredReviews.length != 0 && (
                <div className={styles.filterContainer}>
                    <button onClick={() => handleFilterChange("all")}>
                        All
                    </button>
                    {Object.entries(getRatingCounts()).map(
                        ([rating, count]) => (
                            <button
                                key={rating}
                                onClick={() =>
                                    handleFilterChange(parseInt(rating))
                                }
                            >
                                {rating} stars ({count})
                            </button>
                        )
                    )}
                </div>
            )}
            <div
                id="reviews"
                ref={reviewsRef}
                className={styles.reviewsSection}
            >
                {filteredReviews.length !== 0 && <h2>Reviews</h2>}
                {filteredReviews &&
                    filteredReviews
                        .sort(
                            (a, b) =>
                                Date.parse(b.created_at) -
                                Date.parse(a.created_at)
                        )
                        .slice(0, displayedReviewsCount)
                        .map((review, index) => (
                            <div key={index} className={styles.review}>
                                <RestaurantReview review={review} />
                            </div>
                        ))}

                {displayedReviewsCount < filteredReviews.length && (
                    <button
                        onClick={() =>
                            setDisplayedReviewsCount(displayedReviewsCount + 5)
                        }
                        className={styles.loadMoreButton}
                    >
                        Show More
                    </button>
                )}
            </div>
            <div id="writeReview" ref={writeReviewRef}>
                {user ? (
                    <form
                        className={styles.reviewForm}
                        onSubmit={handleSubmitReview}
                    >
                        <h2>Submit your review</h2>
                        <InteractiveStarRating
                            onRatingChange={setSelectedRating}
                        />
                        <textarea
                            placeholder="Write your review here..."
                            value={review || ""}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        {error && (
                            <p className="error">
                                I'm sorry, we don't expect War and Peace, but a
                                few more words would make a world of difference,
                                thank you!
                            </p>
                        )}
                        <button type="submit">Submit</button>
                    </form>
                ) : (
                    <div>
                        <p className={styles.loginToLeaveReviewMsg}>
                            Please login to leave a review.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantPage;
