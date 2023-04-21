import Link from "next/link";
import { useState } from "react";
import Layout from "@component/components/Layout";
import { useUser } from "@component/lib/authContext";
import RestaurantsList from "@component/components/RestaurantsList";
import Toggle from "@component/components/FormElements/Toggle";
import Map from "@component/components/Map";

// Restaurants Page
export default function Restaurants() {
    const { user, loading } = useUser();
    const [selectedValue, setSelectedValue] = useState("List View");

    const handleToggle = (newValue) => {
        setSelectedValue(newValue);
    };

    return (
        <Layout>
            <div className="container">
                <Toggle
                    value1="List View"
                    value2="Map View"
                    selectedValue={selectedValue}
                    handleToggle={handleToggle}
                />
                {selectedValue == "List View" && <RestaurantsList />}
                {selectedValue == "Map View" && <Map />}
            </div>
        </Layout>
    );
}
