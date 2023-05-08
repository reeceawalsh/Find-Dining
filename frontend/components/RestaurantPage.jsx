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
import convertToDateObject from "@component/lib/convertToDateObject";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
    const isGeolocationAvailable = 'geolocation' in navigator;

    const [error, setError] = useState(false);

    const yelpLogo = require("../public/YelpLogo.png");
    const phoneIconOrange = require("../public/PhoneIconOrange.svg");


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
        if (review && review.length > 60) {
            submitReview(review, token, selectedRating);
            console.log("Submitted review:", review);
            setReview("");
            setSelectedRating(0);
            setError(false);
        } else {
            setError(true);
        }
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
                >
                    <div className={styles.headerTitleContainer}>
                        <h1 className={styles.restaurantName}>{name}</h1>
                        <CheckCircleIcon className={styles.titleIcon} />
                        <FavoriteIcon className={styles.titleIcon} />
                    </div>
                    <div className={styles.headerRating}>
                        <StarRating rating={rating} />
                        <span>{review_count} reviews</span>
                    </div>
                    <div className={styles.headerInfo}>
                        <span className={styles.price}>{price} <span className={styles.separatorDot}>·</span></span>
                        <div className={styles.categories}>
                            {categories &&
                                categories.map((type, index) => (
                                    <div key={index}>
                                        {categories.length - 1 == index ? (
                                            <p>{type.title}</p>
                                        ) : (
                                            // ${"\u00A0"} is a white space character
                                            <p>{`${type.title}${"\u00A0"}`}
                                            <span className={styles.separatorDot}>·</span>
                                            {`${"\u00A0"}`}</p>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </header>
            <div className={styles.photos}>
                <img
                    className={styles.restaurantImage}
                    src={photos[1]}
                />
                <img
                    className={styles.restaurantImage}
                    src={photos[0]}
                />
                <img
                    className={styles.restaurantImage}
                    src={photos[2]}
                />
            </div>
            <div className={styles.restaurantInfo}>
            <h2 className={styles.subContainerTitle}>Opening Times and Location</h2>

                <div className={styles.subContainer}>
                    <div className={styles.leftContainer}>
                        <OpeningHours hours={hours} />
                        <a
                            className={styles.yelpLink}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View opening hours on 
                            <Image
                            className={styles.yelpLogo}
                            src={yelpLogo}
                            alt="The Yelp logo"
                            />
                        </a>
                        <p className={styles.phoneNumber}>
                            <Image
                                className={styles.phoneIcon}
                                src={phoneIconOrange}
                                alt="The Yelp logo"
                            />
                            {display_phone}
                        </p>
                    </div>
                    <div className={styles.rightContainer}>
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
                            {isGeolocationAvailable ?
                            <p className={styles.geolocationOff}>Please enable location to find out how far away the restaurant is!</p> :
                            <div>
                                <p>This restaurant is <span className={styles.distance}>{distance}</span> away!</p>
                                <p>This is <span className={styles.distance}>{distance / 84}</span> minutes away when walking!</p>
                            </div>
                            }
                            <div className={styles.address}>
                                <RestaurantAddress className = {styles.restaurantAddress} location={location} />
                            </div>
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
            <div className={styles.writeReview} id="writeReview" ref={writeReviewRef}>
                {user ? (
                    <form
                        className={styles.reviewForm}
                        onSubmit={handleSubmitReview}
                    >
                        <h2 className={styles.reviewTitle}>Submit a review!</h2>
                        <div className = {styles.reviewRating}>
                            <InteractiveStarRating
                                onRatingChange={setSelectedRating}
                            />
                        </div>
                        <textarea
                            placeholder="Write your review here..."
                            value={review}
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
