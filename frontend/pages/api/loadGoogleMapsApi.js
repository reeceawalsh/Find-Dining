// loads google maps api
export const loadGoogleMapsApi = (callback) => {
    const existingScript = document.getElementById("googleMaps");

    if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.id = "googleMaps";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (callback) callback();
        };
    } else if (callback) callback();
};
