import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form', () => {
    const { getByLabelText, getByText } = render(<Login />);
    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByText(/login/i)).toBeInTheDocument();
  });

  test('submits login form with username and password', async () => {
    const onLoginMock = jest.fn();
    const { getByLabelText, getByText } = render(<Login onLogin={onLoginMock} />);
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByText(/login/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(onLoginMock).toHaveBeenCalledWith('testuser', 'password123');
    });
  });

  test('displays error message when form submitted with empty fields', async () => {
    const onLoginMock = jest.fn();
    const { getByText } = render(<Login onLogin={onLoginMock} />);
    const loginButton = getByText(/login/i);

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText(/please enter both username and password/i)).toBeInTheDocument();
    });
  });
});
