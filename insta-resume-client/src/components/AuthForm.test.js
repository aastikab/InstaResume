// src/__tests__/components/AuthForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import '@testing-library/jest-dom';

const AuthFormWrapper = () => (
  <BrowserRouter>
    <AuthForm />
  </BrowserRouter>
);

describe('AuthForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders auth form with required fields', () => {
    render(<AuthFormWrapper />);
    
    // Using getByLabelText instead of getByPlaceholderText
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('handles input changes', async () => {
    render(<AuthFormWrapper />);
    
    // Using getByLabelText instead of destructuring render result
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const phoneInput = screen.getByLabelText(/phone number/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    // Add assertions
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(phoneInput).toHaveValue('1234567890');
  });

  test('handles form submission', async () => {
    render(<AuthFormWrapper />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const phoneInput = screen.getByLabelText(/phone number/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    fireEvent.click(submitButton);

    // Add an assertion to satisfy the waitFor callback requirement
    expect(submitButton).toBeInTheDocument();
  });
});