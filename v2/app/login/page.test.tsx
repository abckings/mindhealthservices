// v2/app/login/page.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './page';

// Mock auth and signIn
jest.mock('@/auth', () => ({
  auth: jest.fn(() => Promise.resolve(null)),
  signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('LoginPage', () => {
  // Since LoginPage is an async Server Component, we need to handle it.
  // Testing RSCs directly with React Testing Library is tricky.
  // Standard practice is to test the client components within, or wrap it.
  // However, for unit testing an RSC, we can await the default export.

  it('renders login form', async () => {
    const component = await LoginPage();
    render(component);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
  });

  // Note: We cannot easily test the form submission of server actions in this unit test setup
  // without more complex mocking of the 'use server' boundary which Jest doesn't natively handle well for interactions.
  // But we can verify the structure is correct.
});
