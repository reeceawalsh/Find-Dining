import reverseGeocode from "./reverseGeoCode";
const fetchPostCode = async (location) => {
    if (!location) return;
    const { lat, lng } = location;
    const { postCode } = await reverseGeocode(lat, lng);
    return postCode;
};

export default fetchPostCode;
