// Dietary Restrictions Page
import React, { useState } from "react";
import Header from "../../components/Header";

import styles from "./styles/dietary-restrictions.module.css";

export default function DietaryRestrictions() {
    // this initialises restrictions to false, because not set true by user with clicking on it

    const [restrictions, setRestrictions] = useState({
        Vegan: false,
        Vegetarian: false,
        Halal: false,
        Kosher: false,
        GlutenFree: false,
        LactoseFree: false,
        SoyFree: false,
        NutFree: false,
        Keto: false,
        LowSodium: false,
        Healthy: false,
        ShellfishFree: false,
        Organic: false,
    });

    const handleRestrictionsChange = (event) => {
        setRestrictions({
            // this "spread operator" handles state change when button is clicked.
            //updates the state of the restriction object
            ...restrictions,
            [event.target.name]: !restrictions[event.target.name],
        });
        console.log(event);
    };

    const handleReset = () => {
        setRestrictions({
            // this resets restrictions to false
            Vegan: false,
            Vegetarian: false,
            Halal: false,
            Kosher: false,
            GlutenFree: false,
            LactoseFree: false,
            SoyFree: false,
            NutFree: false,
            Keto: false,
            LowSodium: false,
            Healthy: false,
            ShellfishFree: false,
            Organic: false,
        });
    };

    const handleSave = () => {
        // check if the user has changed anything and display a pop up if they have and they have tried to leave without saving
        // post new dietary restrictions to strapi
    };

    const RestrictionButton = ({ name }) => (
        // this basically takes in a name property or "prop" and makes a label with the property.
        <div className={styles.dietaryRestriction}>
            <button
                className={restrictions[name] ? styles.selected : ""}
                onClick={() => handleRestrictionsChange({ target: { name } })}
            >
                {name}
            </button>
        </div>
    );

    return (
        <div className={`"container" ${styles.container}`}>
            <Header name="Dietary Restrictions" />
            <h2 className={styles.description}>
                You will not receive results for restaurants that do not cater
                for your restrictions.
            </h2>
            <div className={styles.subContainer}>
                <RestrictionButton name="Vegan" />
                <RestrictionButton name="Vegetarian" />
                <RestrictionButton name="Halal" />
                <RestrictionButton name="Kosher" />
                <RestrictionButton name="GlutenFree" />
                <RestrictionButton name="LactoseFree" />
                <RestrictionButton name="SoyFree" />
                <RestrictionButton name="NutFree" />
                <RestrictionButton name="Keto" />
                <RestrictionButton name="LowSodium" />
                <RestrictionButton name="Healthy" />
                <RestrictionButton name="ShellfishFree" />
                <RestrictionButton name="Organic" />
            </div>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={handleSave}>
                    Save
                </button>
                <button className={styles.button} onClick={handleReset}>
                    Reset
                </button>
            </div>
        </div>
    );
}
