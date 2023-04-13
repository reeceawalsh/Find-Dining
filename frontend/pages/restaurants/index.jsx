import Link from "next/link";
import { useState } from "react";
import Layout from "@component/components/Layout";
import { useUser } from "@component/lib/authContext";

// Restaurants Page
export default function Restaurants() {
    const [restaurant, setRestaurant] = useState({
        name: "",
    });
    const { user, loading } = useUser();

    const setName = (event) => {
        const { name, value } = event.target;
        setRestaurant((prevName) => ({
            ...prevName,
            [name]: value,
        }));
    };

    return (
        <Layout user={user}>
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
        </Layout>
    );
}
