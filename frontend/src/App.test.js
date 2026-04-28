// Fix 12: Updated test to match what actually renders in the app
import { render, screen } from '@testing-library/react';
import Root from './App';

test('renders VaultIQ login page', () => {
  render(<Root />);
  // The login page shows "Welcome back" or the VaultIQ brand name
  const heading = screen.getByText(/VaultIQ/i);
  expect(heading).toBeInTheDocument();
});