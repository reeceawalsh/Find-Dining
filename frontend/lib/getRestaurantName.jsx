import { useRouter } from "next/router";

// retrieves the restaurants name from the url and formats it properly for use. this function is needed because I'm passing the restaurant id and the restaurant name from the map view and list view to the specific restaurant page in the url.
const getRestaurantName = () => {
    const router = useRouter();

    const getRestaurantName = (path) => {
        const decodedPath = decodeURIComponent(path);
        const pathArray = decodedPath.split("/");
        const lastPathSegment = pathArray[pathArray.length - 1];
        // Remove the query string from the last path segment
        const restaurantName = lastPathSegment.split("?")[0];
        return restaurantName;
    };

    const restaurantName = getRestaurantName(router.asPath);
    return restaurantName;
};

export default getRestaurantName;
