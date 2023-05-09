import usePlacesAutocomplete, {
    getLatLng,
    getGeocode,
} from "use-places-autocomplete";
import styles from "./styles/searchbar.module.css";
import { useContext } from "react";
import { useRouter } from "next/router";
import Location from "../lib/locationContext";
import Image from "next/image";

// search bar to be used on the homepage.
const SearchBar = ({ onPlaceSelected }) => {
    const { location, setLocation } = useContext(Location);
    const router = useRouter();
    const searchIcon = require("../public/HomeSearchIcon.svg");
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

    // handles selecting an address from the dropdown menu
    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        // get the latitude and longitude of the selected place
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = getLatLng(results[0]);

            if (onPlaceSelected) {
                onPlaceSelected({ address, lat, lng });
            }
            // set the location as the searched location in location context
            setLocation({ lat, lng });
        } catch (error) {
            console.error("Error fetching geocode: ", error);
        }
    };

    // handles pressing the search button, if there's a valid location it will send the user to the /restaurants page
    const handleSearch = () => {
        if (location?.lat && location?.lng) {
            router.push("/restaurants");
        }
    };

    return (
        <div>
            <div className={styles.searchbarContainer}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Input your location to find restaurants near you..."
                    className={styles.searchbar}
                />
                <button
                    className={styles.button}
                    onClick={(e) => {
                        handleSearch(e);
                    }}
                >
                    <Image
                        className={styles.searchIcon}
                        src={searchIcon}
                        alt="Search Icon"
                    />
                </button>
            </div>
            <div className={styles.dropdownWrapper}>
                {status === "OK" &&
                    data.map(({ id, index, description }) => (
                        <div
                            key={index + id}
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
