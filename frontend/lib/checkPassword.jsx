// @component/lib/checkPassword.jsx

import axios from 'axios';

export async function checkPassword(email, password) {
  try {
    const response = await axios.post('/api/password_check', {
      email,
      password,
    });

    return response.data.success;
  } catch (error) {
    console.error('Error checking password:', error);
    return false;
  }
}
