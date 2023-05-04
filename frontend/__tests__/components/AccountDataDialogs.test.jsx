import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AccountDataDialogs from '@component/components/AccountDataDialogs';
import { useUser } from '@component/lib/authContext';
import deleteAccount from '@component/lib/deleteAccount';

jest.mock('@component/lib/authContext', () => ({
  useUser: () => ({
    user: {
      id: '123',
      jwt: 'fake_jwt_token',
      username: 'testuser',
      email: 'testuser@example.com',
    },
    logout: jest.fn(),
  }),
}));

jest.mock('@component/lib/deleteAccount', () => jest.fn());

describe('AccountDataDialogs', () => {
  it('renders the component correctly and opens/closes dialogs', () => {
    const { getByText, queryByText } = render(<AccountDataDialogs />);
    
    // Check if buttons are rendered
    const deleteSavedDataButton = getByText('Delete all saved data');
    const deleteAccountButton = getByText('Delete account');

    // Open and close Saved Data Dialog
    fireEvent.click(deleteSavedDataButton);
    expect(queryByText('Are you sure you want to delete all your saved data?')).toBeInTheDocument();
    fireEvent.click(queryByText('No'));
    expect(queryByText('Are you sure you want to delete all your saved data?')).not.toBeInTheDocument();

    // Open and close Account Deletion Dialog
    fireEvent.click(deleteAccountButton);
    expect(queryByText('Are you sure you want to delete your account?')).toBeInTheDocument();
    fireEvent.click(queryByText('No'));
    expect(queryByText('Are you sure you want to delete your account?')).not.toBeInTheDocument();
  });

  // Add more test cases to check for specific behavior, such as dialog interactions.
});
