import Link from "next/link";
import { useState } from "react";

// Restaurants Page
export default function Restaurants() {
    const [restaurant, setRestaurant] = useState({
        name: "",
    });

    const setName = (event) => {
        const { name, value } = event.target;
        setRestaurant((prevName) => ({
            ...prevName,
            [name]: value,
        }));
    };

    return (
        <div className="container">
            <h1>Either list view or map view</h1>
            <Link className="link" href={`/restaurants/${restaurant.name}`}>
                {restaurant.name}
            </Link>
            <form>
                <input
                    name="name"
                    type="text"
                    placeholder="RestaurantName"
                    value={restaurant.name}
                    onChange={setName}
                />
            </form>
        </div>
    );
}
