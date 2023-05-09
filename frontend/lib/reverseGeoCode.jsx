// this reverse geoCode takes a lat and lng and returns an address including a postcode which is very useful.
export default async function reverseGeocode(lat, lng) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const address = data.display_name;
        const postCode = data.address.postcode;
        return { address, postCode };
    } catch (error) {
        console.error("Error reverse geocoding:", error);
        return { address: null, postCode: null };
    }
}
