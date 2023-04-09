import usePlacesAutocomplete from "use-places-autocomplete";

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

    const handleSelect = (address) => {
        setValue(address, false);
        clearSuggestions();

        if (onPlaceSelected) {
            onPlaceSelected(address);
        }
    };

    return (
        <div>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Search for a location"
            />
            {status === "OK" &&
                data.map(({ id, description }) => (
                    <div key={id} onClick={() => handleSelect(description)}>
                        {description}
                    </div>
                ))}
        </div>
    );
};

export default SearchBar;
