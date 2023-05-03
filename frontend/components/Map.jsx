import {
    GoogleMap,
    CircleF,
    MarkerF,
    InfoWindowF,
} from "@react-google-maps/api";
import styles from "./styles/map.module.css";
import { useState, useEffect, useMemo } from "react";
import DistanceSlider from "./DistanceSlider";
import haversineDistance from "@component/lib/haversineDistance";

const Map = ({
    setPage,
    restaurants,
    radius,
    setRadius,
    location,
    onRadiusChange,
    noMoreRestaurants,
    loader,
}) => {
    const [mapCenter, setMapCenter] = useState({
        lat: location.lat,
        lng: location.lng,
    });
    const [hoveredRestaurant, setHoveredRestaurant] = useState(null);

    const [zoom, setZoom] = useState(11);
    const handleRestaurantHover = (restaurant) => {
        setHoveredRestaurant(restaurant);
    };
    const [activeInfoWindow, setActiveInfoWindow] = useState(null);

    const handlePlaceSelected = ({ address, lat, lng }) => {
        console.log("Selected address:", address);
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);

        setMapCenter({ lat, lng });
    };

    const handleInfoWindow = (restaurant) => {
        if (activeInfoWindow === restaurant) {
            setActiveInfoWindow(null);
        } else {
            setActiveInfoWindow(restaurant);
        }
    };

    const filteredRestaurants = useMemo(() => {
        return restaurants.filter((restaurant) => {
            const restaurantLat = restaurant.coordinates.latitude;
            const restaurantLng = restaurant.coordinates.longitude;
            const distance = haversineDistance(
                mapCenter.lat,
                mapCenter.lng,
                restaurantLat,
                restaurantLng
            );
            return distance <= radius;
        });
    }, [restaurants, mapCenter, radius]);

    const loadMore = () => {
        console.log("loading more");
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        if (restaurants.length <= 20) {
            loadMore();
        }
    }, []);

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
                <DistanceSlider
                    radius={radius}
                    onRadiusChange={(newRadius) => {
                        setRadius(newRadius);
                        onRadiusChange(newRadius);
                    }}
                />
                <div className={styles.restaurantsList}>
                    <h2>Top Rated Nearby Restaurants:</h2>
                    {filteredRestaurants
                        .sort((a, b) => b.rating - a.rating)
                        .map((restaurant) => (
                            <div
                                key={restaurant.place_id}
                                onMouseEnter={() =>
                                    handleRestaurantHover(restaurant)
                                }
                                onMouseLeave={() => handleRestaurantHover(null)}
                                className={styles.restaurant}
                            >
                                {restaurant.name} - {restaurant.rating} / 5
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
