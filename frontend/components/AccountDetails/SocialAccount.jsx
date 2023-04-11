// components/AccountDetails/SocialAccount.jsx

import React, { useState } from 'react';

const SocialAccount = ({ icon, name, userImage, userName }) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div>
      {icon}
      <span>{name}</span>
      <span>{isConnected ? 'Connected' : 'Not Connected'}</span>
      {isConnected && (
        <>
          <img src={userImage} alt={`${name} profile`} />
          <span>{userName}</span>
        </>
      )}
    </div>
  );
};

export default SocialAccount;
