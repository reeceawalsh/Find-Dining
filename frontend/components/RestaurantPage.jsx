import { useState, useEffect, useContext } from "react";
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
import { useCookies } from "react-cookie";
import InteractiveStarRating from "./InteractiveStarRating";
import { useUser } from "@component/lib/authContext";
import Image from "next/image";
import Location from "@component/lib/locationContext";
import postReview from "@component/lib/postReview";

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
    const [minutesAway, setMinutesAway] = useState(null);
    const [displayedReviewsCount, setDisplayedReviewsCount] = useState(5);
    const [filteredReviews, setFilteredReviews] = useState(reviews);
    const { geoLocation } = useContext(Location);
    const [error, setError] = useState(false);
    const yelpLogo = require("../public/YelpLogo.png");
    const phoneIconOrange = require("../public/PhoneIconOrange.svg");

    const { user } = useUser();

    // works out how far away the restaurant is from the users geolocation
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

    // sets the distance away from the user and works out how far that is in minutes based on average walking speed. This will update if the users location changes.
    useEffect(() => {
        setDistance(getDistance);
        if (distance) {
            const minutes = (distance.split(" ")[0] / 84).toFixed(2);
            setMinutesAway(minutes);
        }
    }, [geoLocation]);

    // handles scrolling to the correct section, writeReview not currently in use.
    useEffect(() => {
        // identifies the current section.
        const hash = window.location.hash;
        // target element is the section we want to scroll to.
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
            // scrolls to the target section if it exists and theres a base point (hash)
            if (hash && targetElement) {
                window.scrollTo({
                    // calculate top using a custom function "getOffsetTop" because the built in function wasn't calculating it correctly.
                    top: getOffsetTop(targetElement),
                    behavior: "smooth",
                });
            }
        };
        // if the page has loaded it will scroll to the target element
        if (document.readyState === "complete") {
            scrollToTargetElement();
        } else {
            // will scroll to the target element when it's finally loaded
            window.addEventListener("load", scrollToTargetElement);
            // will remove the function from the window on unmount to prevent memory leaks
            return () =>
                window.removeEventListener("load", scrollToTargetElement);
        }
    }, []);

    // submits a review using the /api/addReview route
    const submitReview = async (review, rating) => {
        // send the review to the backend
        const newReview = {
            review: review,
            Restaurant: strapiRestaurantDetails.id,
            reviewer: user.username,
            rating: rating,
        };
        try {
            const response = await postReview(newReview);
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

    // this function counts the amount of each rating and returns them as an object. example output - {0: 1, 4: 1}
    const getRatingCounts = () => {
        const ratingCounts = {};
        // iterate over each review
        reviews.forEach((review) => {
            // round the rating to the nearest integer
            const rating = Math.round(review.rating);
            // if the rating doesn't exist in the ratingCounts object, add it and initialize the count to 1
            if (!ratingCounts[rating]) {
                ratingCounts[rating] = 1;
            } else {
                // if the rating does exist in the ratingCounts object, increment the count
                ratingCounts[rating]++;
            }
        });

        return ratingCounts;
    };

    // handles changing the review filter, filters through and only shows reviews based on the rating based in as a parameter
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

    // handles submitted a review. ensures the review is atleast 11 characters long. then sets review, resets the star rating back to 0 and removes any errors that may be there from not writing a long enough review
    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (review && review.length > 10) {
            submitReview(review, selectedRating);
            console.log("Submitted review:", review);
            setReview("");
            setSelectedRating(0);
            console.log(selectedRating);
            setError(false);
        } else {
            setError(true);
        }
    };

    // sets token based on cookies
    useEffect(() => {
        setToken(cookies["jwt"]);
    }, [cookies]);

    return (
        <div className="container">
            {/** Header Section */}
            <header className={styles.header}>
                <div className={styles.headerTitleContainer}>
                    <h1 className={styles.restaurantName}>{name}</h1>
                </div>
                <div className={styles.headerRating}>
                    <div className={styles.ratingWrapper}>
                        <StarRating rating={rating} />
                    </div>
                    <span>{review_count} reviews</span>
                </div>
                <div className={styles.headerInfo}>
                    <span className={styles.price}>
                        {price} <span className={styles.separatorDot}>·</span>
                    </span>
                    {/** Categories are food types the restaurant serves */}
                    <div className={styles.categories}>
                        {categories &&
                            categories.map((type, index) => (
                                <div key={index}>
                                    {categories.length - 1 == index ? (
                                        <p>{type.title}</p>
                                    ) : (
                                        // ${"\u00A0"} is a white space character
                                        <p>
                                            {`${type.title}${"\u00A0"}`}
                                            <span
                                                className={styles.separatorDot}
                                            >
                                                ·
                                            </span>
                                            {`${"\u00A0"}`}
                                        </p>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </header>
            {/** Will display photos if they are available and a line if not. */}
            {photos[0] ? (
                <div className={styles.photos}>
                    <img className={styles.restaurantImage} src={photos[1]} />
                    <img className={styles.restaurantImage} src={photos[0]} />
                    <img className={styles.restaurantImage} src={photos[2]} />
                </div>
            ) : (
                <div className={styles.line}></div>
            )}
            <div className={styles.restaurantInfo}>
                <h2 className={styles.subContainerTitle}>
                    Opening Times and Location
                </h2>
                {/** Information Sections */}
                <div className={styles.subContainer}>
                    <div className={styles.leftContainer}>
                        <OpeningHours hours={hours} />
                        <a
                            className={styles.yelpLink}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View more information on
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
                            {/** This will attempt to call that phone number when clicked on supporting browsers. */}
                            <a href={`tel:${display_phone}`}>{display_phone}</a>
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
                                {/** This marker is placed at the location of the restaurant. */}
                                <MarkerF
                                    position={{
                                        lat: coordinates.latitude,
                                        lng: coordinates.longitude,
                                    }}
                                />
                            </GoogleMap>
                        </div>
                        {/** If a distance has not been calculated i.e. no location has been provided then it will provide a message to show that it's a feature that can be enabled. */}
                        {!distance && (
                            <p className={styles.geolocationOff}>
                                Please enable location to find out how far away
                                the restaurant is!
                            </p>
                        )}
                        {distance && minutesAway && (
                            <div>
                                <p>
                                    This restaurant is{" "}
                                    <span className={styles.distance}>
                                        {distance}
                                    </span>{" "}
                                    away!
                                </p>
                                <p>
                                    This is{" "}
                                    <span className={styles.distance}>
                                        {minutesAway}
                                    </span>{" "}
                                    minutes away when walking!
                                </p>
                            </div>
                        )}
                        <div className={styles.address}>
                            <RestaurantAddress
                                className={styles.restaurantAddress}
                                location={location}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Ensure only a logged in user can view reviews. */}
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
                {/* Will only display the reviews title if there are any reviews to actually display. Reviews are sorted by date of creation. */}
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
                {/* If there are less reviews shown than actual reviews, this show more button will appear to allow the user to show more reviews (just increases the amount of reviews that are shown, doesn't hide previous ones. */}
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
            <div
                className={styles.writeReview}
                id="writeReview"
                ref={writeReviewRef}
            >
                {/* If a user is logged in it will allow them to submit a review, otherwise it will notify them to login if they want to submit a review. */}
                {user ? (
                    <form
                        className={styles.reviewForm}
                        onSubmit={handleSubmitReview}
                    >
                        <h2 className={styles.reviewTitle}>Submit a review!</h2>
                        <div className={styles.reviewRating}>
                            <InteractiveStarRating
                                onRatingChange={setSelectedRating}
                            />
                        </div>
                        <textarea
                            placeholder="Write your review here..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        {/* This error message will appear if the user tries to submit a message without writing enough characters. */}
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
