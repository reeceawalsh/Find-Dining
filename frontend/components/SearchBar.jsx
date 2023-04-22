import usePlacesAutocomplete, {
    getLatLng,
    getGeocode,
} from "use-places-autocomplete";
import styles from "./styles/searchbar.module.css";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

const SearchBar = ({ onPlaceSelected }) => {
    const [location, setLocation] = useState({ lat: "", lng: "" });
    const router = useRouter();

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: { componentRestrictions: { country: "uk" } },
        debounce: 300,
        cache: 86400,
    });

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        // Get the latitude and longitude of the selected place
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);

            if (onPlaceSelected) {
                onPlaceSelected({ address, lat, lng });
            }
            setLocation({ ...location, lat: lat, lng: lng });
            console.log(location);
        } catch (error) {
            console.error("Error fetching geocode: ", error);
        }
    };

    const handleSearch = () => {
        if (location.lat && location.lng) {
            router.push("/restaurants");
        }
    };

    useEffect(() => {
        if (location.lat && location.lng) {
            // Save the location to the local storage
            localStorage.setItem("location", JSON.stringify(location));
            console.log(location);
        }
    }, [location]);

    return (
        <div>
            <div className={styles.searchbarContainer}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Search for a location"
                    className={styles.searchbar}
                />
                <button
                    className={styles.button}
                    onClick={(e) => {
                        handleSearch(e);
                    }}
                >
                    Search
                </button>
            </div>
            <div className={styles.dropdownWrapper}>
                {status === "OK" &&
                    data.map(({ id, description }) => (
                        <div
                            key={id}
                            className={styles.dropdownItem}
                            onClick={() => handleSelect(description)}
                        >
                            {description}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SearchBar;
