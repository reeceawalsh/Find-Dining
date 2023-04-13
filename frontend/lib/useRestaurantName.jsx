import { useRouter } from "next/router";

const useRestaurantName = () => {
    const router = useRouter();

    const getRestaurantName = (path) => {
        const pathArray = path.split("/");
        const lastIndex = pathArray.length - 1;

        if (pathArray[lastIndex] === "reviews") {
            return pathArray[lastIndex - 1];
        }

        return pathArray[lastIndex];
    };

    const format = (name) => {
        return name
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const restaurantName = getRestaurantName(router.asPath);
    const formattedRestaurantName = format(restaurantName);
    return formattedRestaurantName;
};

export default useRestaurantName;
