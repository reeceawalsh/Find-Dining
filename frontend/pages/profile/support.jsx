// Support Page

import React from "react";
import Header from "../../components/Header";
import SupportLink from "../../components/SupportLink";

import styles from "./styles/support-page.module.css";

export default function Support() {
  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.supportTitle}>Support Page</h1>
      <SupportLink
        title="How do view restaurants which adhere to my dietary requirments?"
        body="In order to view restaurants based on your dietary restrictions, please ."
      />
      <SupportLink
        title="How do I add restaurants to my favourites list?"
        body="Whilst browning the app and looking at different restaurants, use the favoruite button to add the restaurant to your favourites list."
      />
      <SupportLink
        title="How do I view my favourite restaurants?"
        body="In order to view your favourite restaurants, please click on the favourites button in the homepage"
      />
      <SupportLink
        title="How do I provide feedback on my experience?"
        body="We value your feedback and would love to hear about your experience. Please click on the review button on the popup you'll receive after visiting the restaurant."
      />
    </div>
  );
}
