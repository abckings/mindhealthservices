import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';

// Mock Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar', () => {
  it('renders desktop navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('RAJ MIND HEALTH')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('toggles mobile menu on click', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Check mobile menu is closed initially
    // We check for an element that only appears in mobile menu
    const mobileLink = screen.queryByText('+91 63833 76668', { selector: 'div.pt-4 a' });
    expect(mobileLink).not.toBeInTheDocument();

    // Click mobile menu button
    const buttons = screen.getAllByRole('button');
    const menuButton = buttons.find(b => b.className.includes('md:hidden'));

    if (menuButton) {
      await user.click(menuButton);

      // Now mobile menu should be open
      // Check for the mobile specific element again
      expect(screen.getByText('+91 63833 76668', { selector: 'div.pt-4 a' })).toBeInTheDocument();

      // Close it
      await user.click(menuButton);
      expect(screen.queryByText('+91 63833 76668', { selector: 'div.pt-4 a' })).not.toBeInTheDocument();
    } else {
        throw new Error("Mobile menu button not found");
    }
  });
});
