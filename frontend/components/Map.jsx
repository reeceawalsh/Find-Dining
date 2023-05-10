import {
    GoogleMap,
    CircleF,
    MarkerF,
    InfoWindowF,
} from "@react-google-maps/api";
import styles from "./styles/map.module.css";
import { useState, useEffect, useMemo } from "react";
import haversineDistance from "@component/lib/haversineDistance";
import NavLink from "./NavLink";

// map view component to display restaurants with a map beside them.
const Map = ({ setPage, restaurants, radius, location, noMoreRestaurants }) => {
    // sets the center of the map to the middle of the location passed in.
    const [mapCenter, setMapCenter] = useState({
        lat: location.lat,
        lng: location.lng,
    });
    console.log(restaurants);
    const [hoveredRestaurant, setHoveredRestaurant] = useState(null);
    // zoom will be set based on the radius that is passed down.
    const [zoom, setZoom] = useState();
    const [activeInfoWindow, setActiveInfoWindow] = useState(null);

    // handles setting the restaurant that is currently being hovered over.
    const handleRestaurantHover = (restaurant) => {
        setHoveredRestaurant(restaurant);
    };

    // handles setting the place that is selected and moving the map to ensure it's now in the center (not currently in use).
    const handlePlaceSelected = ({ address, lat, lng }) => {
        console.log("Selected address:", address);
        setMapCenter({ lat, lng });
    };

    // handles the info window opening and closing.
    const handleInfoWindow = (restaurant) => {
        if (activeInfoWindow === restaurant) {
            setActiveInfoWindow(null);
        } else {
            setActiveInfoWindow(restaurant);
        }
    };

    // filteres through the restaurants and ensures only ones within distance are included
    const filteredRestaurants = useMemo(() => {
        return restaurants.filter((restaurant) => {
            const geoLocation = {
                lat: restaurant.coordinates.latitude,
                lng: restaurant.coordinates.longitude,
            };

            const distance = haversineDistance(
                mapCenter.lat,
                mapCenter.lng,
                geoLocation
            );
            return distance <= radius;
        });
    }, [restaurants, mapCenter, radius]);

    // will load more restaurants (i.e add pages)
    const loadMore = () => {
        setPage((prev) => prev + 1);
    };

    // will change the map view when the radius slider is changed
    useEffect(() => {
        if (radius >= 10000) {
            setZoom(11);
        } else if (radius >= 7200) {
            setZoom(12);
        } else if (radius >= 5000) {
            setZoom(12.5);
        } else if (radius >= 3600) {
            setZoom(13);
        } else if (radius >= 2000) {
            setZoom(13.5);
        } else if (radius >= 1000) {
            setZoom(14);
        } else if (radius >= 500) {
            setZoom(15);
        } else if (radius >= 300) {
            setZoom(16);
        } else {
            setZoom(17);
        }
    }, [radius]);

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.restaurantsList}>
                    <h2 className={styles.listTitle}>Nearby Restaurants</h2>
                    {filteredRestaurants.map((restaurant) => (
                        <div
                            key={restaurant.place_id}
                            onMouseEnter={() =>
                                handleRestaurantHover(restaurant)
                            }
                            onMouseLeave={() => handleRestaurantHover(null)}
                            className={styles.restaurant}
                        >
                            <div
                                className={styles.individualRestaurantContainer}
                            >
                                <NavLink
                                    className={styles.restaurantName}
                                    href={`/restaurants/${restaurant.name}?id=${restaurant.id}`}
                                >
                                    <h4>{restaurant.name}</h4>
                                </NavLink>

                                <div className={styles.ratingContainer}>
                                    {restaurant.rating.toFixed(1)}
                                </div>
                            </div>
                        </div>
                    ))}
                    {noMoreRestaurants && (
                        <div className={styles.loader}>
                            <p>
                                There are no more restaurants that fit this
                                criteria. Please change your criteria or
                                location to find matching restaurants in your
                                area.
                            </p>
                        </div>
                    )}
                    {!noMoreRestaurants && (
                        <div className={styles.loader}>
                            <button
                                className={styles.loadBtn}
                                onClick={loadMore}
                            >
                                More Restaurants
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.map}>
                <GoogleMap
                    options={{
                        disableDefaultUI: true,
                        clickableIcons: true,
                        scrollwheel: false,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                    }}
                    zoom={zoom}
                    center={mapCenter}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    onLoad={() => console.log("Map loaded")}
                >
                    <CircleF
                        center={mapCenter}
                        radius={radius}
                        onLoad={() => console.log("Loaded circle radius")}
                        options={{
                            fillColor: "green",
                            strokeOpacity: 0.35,
                        }}
                    />
                    {/* places a marker on the map on hover */}
                    {hoveredRestaurant && (
                        <MarkerF
                            position={{
                                lat: hoveredRestaurant.coordinates.latitude,
                                lng: hoveredRestaurant.coordinates.longitude,
                            }}
                            onClick={() => handleInfoWindow(hoveredRestaurant)}
                        />
                    )}
                    {activeInfoWindow && (
                        <InfoWindowF
                            position={{
                                lat: activeInfoWindow.lat,
                                lng: activeInfoWindow.lng,
                            }}
                            onCloseClick={() => handleInfoWindow(null)}
                        >
                            <div>
                                <h3>{activeInfoWindow.name}</h3>
                                <p>Rating: {activeInfoWindow.rating} / 5</p>
                                <p>{activeInfoWindow.address}</p>
                                {activeInfoWindow.image_url && (
                                    <img
                                        src={activeInfoWindow.image_url}
                                        alt={activeInfoWindow.name}
                                        style={{ maxWidth: "200px" }}
                                    />
                                )}
                            </div>
                        </InfoWindowF>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

export default Map;
