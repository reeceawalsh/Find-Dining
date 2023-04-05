// Dietary Restrictions Page
import React, { useState } from "react";
import Header from "../../components/Header";

import styles from "./styles/dietary-restrictions.module.css";

export default function DietaryRestrictions() {

  // this initialises restrictions to false, because not set true by user with clicking on it 

  const [restrictions, setRestrictions] = useState({
    vegan: false,
    vegetarian: false,
    halal: false,
    kosher: false,
    glutenFree: false,
    lactoseFree: false,
    soyFree: false,
    nutFree: false,
    keto: false,
    lowSodium: false,
    healthy: false,
    shellfishFree: false,
    organic: false,
  });

  const handleRestrictionsChange = (event) => {
    setRestrictions({
      // this "spread operator" handles state change when button is clicked. 
      //updates the state of the restriction object 
      ...restrictions,
      [event.target.name]: !restrictions[event.target.name],
    });
  };

  const handleReset = () => {
    setRestrictions({

      // this resets restrictions to false
      vegan: false,
      vegetarian: false,
      halal: false,
      kosher: false,
      glutenFree: false,
      lactoseFree: false,
      soyFree: false,
      nutFree: false,
      keto: false,
      lowSodium: false,
      healthy: false,
      shellfishFree: false,
      organic: false,
    });
  };

  const handleSave = () => {
    // this is to be implemented, with the backend, to save the ture or false stuff with the user id.
  };

  const RestrictionButton = ({ name }) => (

    // this basically takes in a name property or "prop" and makes a label with the property.
    <button
      className={`${styles.restrictionButton} ${
        restrictions[name] ? styles.selected : ""
      }`}
      onClick={() => handleRestrictionsChange({ target: { name } })}
    >
      {name}
    </button>
  );

  return (
    <div className={styles.container}>
      <Header name="Dietary Restrictions" backButton saveButton onSave={handleSave} />
      <div className={styles.restrictionsContainer}>
        <div className={styles.restrictionsHeader}>
          <h2>You will not receive results for restaurants that do not cater for your restrictions</h2>
        </div>
        <div className={styles.restrictions}>
          <RestrictionButton name="vegan" />
          <RestrictionButton name="vegetarian" />
          <RestrictionButton name="halal" />
          <RestrictionButton name="kosher" />
          <RestrictionButton name="glutenFree" />
          <RestrictionButton name="lactoseFree" />
          <RestrictionButton name="soyFree" />
          <RestrictionButton name="nutFree" />
          <RestrictionButton name="keto" />
          <RestrictionButton name="lowSodium" />
          <RestrictionButton name="healthy" />
          <RestrictionButton name="shellfishFree" />
          <RestrictionButton name="organic" />
        </div>
        <button className={styles.resetButton} onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
