import {
    useLoadScript,
    GoogleMap,
    CircleF,
    MarkerF,
} from "@react-google-maps/api";
import styles from "./styles/map.module.css";
import { useState, useEffect, useMemo } from "react";
import SearchBar from "./SearchBar";
import DistanceSlider from "./DistanceSlider";
import useFetchNearbyRestaurants from "../lib/useFetchRestaurants";

const Map = () => {
    const libraries = useMemo(() => ["places"], []);
    const [mapCenter, setMapCenter] = useState({
        lat: 54.9783,
        lng: -1.61396,
    });

    const [radius, setRadius] = useState(1000);
    const [zoom, setZoom] = useState(14);
    const [hoveredRestaurant, setHoveredRestaurant] = useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    const restaurants = useFetchNearbyRestaurants(mapCenter, radius, isLoaded);

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    const handlePlaceSelected = ({ address, lat, lng }) => {
        console.log("Selected address:", address);
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);

        setMapCenter({ lat, lng });
    };
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <h1 className={styles.title}>Set Location</h1>
                <SearchBar onPlaceSelected={handlePlaceSelected} />
                <DistanceSlider
                    radius={radius}
                    onRadiusChange={(newRadius) => {
                        setRadius(newRadius);

                        if (newRadius >= 10000) {
                            setZoom(11.2);
                        } else if (newRadius >= 7200) {
                            setZoom(11.5);
                        } else if (newRadius >= 3600) {
                            setZoom(12);
                        } else if (newRadius >= 2000) {
                            setZoom(13.5);
                        } else if (newRadius >= 1000) {
                            setZoom(14);
                        } else if (newRadius >= 500) {
                            setZoom(15);
                        } else if (newRadius >= 300) {
                            setZoom(16);
                        } else {
                            setZoom(17);
                        }
                    }}
                />
                <div className={styles.restaurantsList}>
                    <h2>Top Rated Nearby Restaurants:</h2>
                    {restaurants
                        .sort((a, b) => b.rating - a.rating)
                        .map((restaurant) => (
                            <div
                                key={restaurant.place_id}
                                onMouseEnter={() =>
                                    setHoveredRestaurant(restaurant)
                                }
                                onMouseLeave={() => setHoveredRestaurant(null)}
                                className={styles.restaurant}
                            >
                                {restaurant.name} - {restaurant.rating} / 5
                            </div>
                        ))}
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
                                lat: hoveredRestaurant.geometry.location.lat(),
                                lng: hoveredRestaurant.geometry.location.lng(),
                            }}
                        />
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

export default Map;
