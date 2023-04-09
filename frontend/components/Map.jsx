import {
    useLoadScript,
    GoogleMap,
    CircleF,
    MarkerF,
} from "@react-google-maps/api";
import styles from "./styles/map.module.css";
import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import { getGeocode } from "use-places-autocomplete";

const Map = () => {
    const libraries = useMemo(() => ["places"], []);
    const mapCenter = useMemo(() => ({
        lat: 54.9783,
        lng: -1.61396,
    }));
    const [radius, setRadius] = useState(1000);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    const mapOptions = {
        disableDefaultUI: true,
        clickableIcons: true,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    const handlePlaceSelected = (address) => {
        console.log(getGeocode(address));
        console.log(address.geometry.location.lat());
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <h1 className={styles.title}>Set Location</h1>
                <SearchBar onPlaceSelected={handlePlaceSelected} />
                <div className={styles.sliderWrapper}>
                    <p>Radius: {(radius / 1000).toFixed(1)} km</p>
                    <input
                        type="range"
                        min="100"
                        max="2000"
                        value={radius}
                        onChange={(e) =>
                            setRadius(parseInt(e.target.value, 10))
                        }
                        className={styles.slider}
                    />
                </div>
            </div>
            <div className={styles.map}>
                <GoogleMap
                    options={mapOptions}
                    zoom={14}
                    center={mapCenter}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    onLoad={() => console.log("Map loaded")}
                >
                    <CircleF
                        center={mapCenter}
                        radius={radius}
                        onLoad={() => console.log("Loaded circle radius")}
                        options={{
                            fillColor: radius > 1000 ? "grey" : "green",
                            strokeOpacity: 0.3,
                        }}
                    />
                </GoogleMap>
            </div>
        </div>
    );
};

export default Map;
