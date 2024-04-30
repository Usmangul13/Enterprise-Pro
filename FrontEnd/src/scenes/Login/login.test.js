import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form', () => {
    const { getByLabelText, getByText } = render(<Login />);
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByText(/login/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('displays error message when form submitted with empty fields', () => {
    const { getByText } = render(<Login />);
    const loginButton = getByText(/login/i);

    fireEvent.click(loginButton);

    const errorMessage = getByText(/please enter both username and password/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('submits login form with username and password', () => {
    const onLoginMock = jest.fn();
    const { getByLabelText, getByText } = render(<Login onLogin={onLoginMock} />);
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByText(/login/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(onLoginMock).toHaveBeenCalledWith('testuser', 'password123');
  });
});
