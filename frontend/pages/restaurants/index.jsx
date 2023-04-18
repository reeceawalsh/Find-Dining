import Link from "next/link";
import { useState } from "react";
import Layout from "@component/components/Layout";
import { useUser } from "@component/lib/authContext";
import RestaurantsList from "@component/components/RestaurantsList";

// Restaurants Page
export default function Restaurants() {
    const { user, loading } = useUser();

    // const setName = (event) => {
    //     const { name, value } = event.target;
    //     setRestaurant((prevName) => ({
    //         ...prevName,
    //         [name]: value,
    //     }));
    // };

    return (
        <Layout>
            <div className="container">
                <h1>Either list view or map view</h1>
                <RestaurantsList />
            </div>
        </Layout>
    );
}
