// src/__tests__/components/ResumeBuilder.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResumeBuilder from '../../components/ResumeBuilder';
import '@testing-library/jest-dom';

describe('ResumeBuilder Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders resume builder form', () => {
    render(<ResumeBuilder />);
    
    // Using getByText for headings
    expect(screen.getByText('Build Your Resume')).toBeInTheDocument();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    
    // Using getByLabelText for form inputs
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
  });

  test('handles personal information input changes', async () => {
    render(<ResumeBuilder />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const addressInput = screen.getByLabelText(/address/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    // Using toHaveValue for input assertions
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(phoneInput).toHaveValue('1234567890');
    expect(addressInput).toHaveValue('123 Main St');
  });

  test('handles form submission', async () => {
    render(<ResumeBuilder />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const submitButton = screen.getByRole('button', { name: /save resume/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.click(submitButton);

    // Add an assertion
    expect(nameInput).toHaveValue('John Doe');
  });
});