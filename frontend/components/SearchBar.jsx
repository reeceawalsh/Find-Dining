import usePlacesAutocomplete, {
    getLatLng,
    getGeocode,
} from "use-places-autocomplete";
import styles from "./styles/searchbar.module.css";

const SearchBar = ({ onPlaceSelected }) => {
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
        } catch (error) {
            console.error("Error fetching geocode: ", error);
        }
    };

    return (
        <div>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Search for a location"
                className={styles.searchbar}
            />
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
