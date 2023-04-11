import React from 'react';
import TextInput from '../FormElements/TextInput';
import SocialAccount from './SocialAccount';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';

const AccountDetailsForm = ({ userDetails, setUserDetails }) => {
  return (
    <div>
      <h2>Account Details</h2>
      <form>
        <TextInput
          name="Name"
          type="text"
          placeholder="Input your name"
          value={userDetails.name}
          onChange={(event) =>
            setUserDetails({ ...userDetails, name: event.target.value })
          }
        />
        <TextInput
          name="City"
          type="text"
          placeholder="Input your city"
          value={userDetails.city}
          onChange={(event) =>
            setUserDetails({ ...userDetails, city: event.target.value })
          }
        />
        <button type="submit">Save</button>
      </form>
      <h2>Social Accounts</h2>
      <SocialAccount
        icon={<FacebookIcon />}
        name="Facebook"
        isConnected={false}
        userImage="/path/to/facebook-user-image.jpg"
        userName="Facebook User"
      />
      <SocialAccount
        icon={<InstagramIcon />}
        name="Instagram"
        isConnected={true}
        userImage="/path/to/instagram-user-image.jpg"
        userName="Instagram User"
      />
      <SocialAccount
        icon={<GoogleIcon />}
        name="Google"
        isConnected={true}
        userImage="/path/to/google-user-image.jpg"
        userName="Google User"
      />
      <p>
        Find Dining will never post on your account without your explicit
        permission.
      </p>
      <button>Delete All Saved Data</button>
      <button>Delete Account</button>
    </div>
  );
};

export default AccountDetailsForm;
