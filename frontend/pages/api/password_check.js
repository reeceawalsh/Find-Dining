// pages/api/password_check.js

import { verifyUserPassword } from '../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { email, password } = req.body;

  try {
    const isPasswordCorrect = await verifyUserPassword(email, password);
    res.status(200).json({ success: isPasswordCorrect });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
