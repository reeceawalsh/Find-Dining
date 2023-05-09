import reverseGeocode from "./reverseGeoCode";
// fetches the users post code based on the passed in location which will be a latitude and longitude ({ lat: latitude, lng: longitude })
const fetchPostCode = async (location) => {
    if (!location) return;
    const { lat, lng } = location;
    const { postCode } = await reverseGeocode(lat, lng);
    return postCode;
};

export default fetchPostCode;
