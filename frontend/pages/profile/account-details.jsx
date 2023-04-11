import React, { useState } from "react";
import AccountDetailsForm from "@component/components/AccountDetails/AccountDetailsForm";
import styles from "@component/components/AccountDetails/account-details.module.css";

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    city: "",
  });

  return (
    <div className={styles.container}>
      <h1>Account Details</h1>
      <AccountDetailsForm
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
    </div>
  );
};

export default AccountDetails;
