import {
    useLoadScript,
    GoogleMap,
    CircleF,
    MarkerF,
} from "@react-google-maps/api";
import styles from "./styles/map.module.css";
import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import DistanceSlider from "./DistanceSlider";

const Map = () => {
    const libraries = useMemo(() => ["places"], []);
    const [mapCenter, setMapCenter] = useState({
        lat: 54.9783,
        lng: -1.61396,
    });

    const [radius, setRadius] = useState(1000);
    const [zoom, setZoom] = useState(14);

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
                {/* <DistanceSlider
                    radius={radius}
                    onRadiusChange={(newRadius) => {
                        setRadius(newRadius);
                        switch (newRadius) {
                            case newRadius <= 2000:
                                setZoom(14);
                                break;
                            case newRadius <= 4000:
                                setZoom(13);
                                break;
                            case newRadius <= 6000:
                                setZoom(12);
                                break;
                            case newRadius <= 8000:
                                setZoom(11);
                                break;
                            case newRadius <= 10000:
                                setZoom(10);
                                break;
                        }
                    }}
                /> */}
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
            </div>
            <div className={styles.map}>
                <GoogleMap
                    options={mapOptions}
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
