import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

// Mock Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
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

  it('toggles mobile menu on click', () => {
    render(<Navbar />);

    // Desktop menu hidden on mobile, but in test env we just check if things exist in DOM.
    // However, the "hidden md:flex" classes rely on CSS which JSDOM doesn't fully simulate for visibility.
    // We can check if the mobile menu container is conditionally rendered.

    // Initially mobile menu is closed
    const contactLinks = screen.getAllByText('Contact Us');
    // One in desktop (always rendered in DOM, just hidden with CSS)
    expect(contactLinks.length).toBeGreaterThanOrEqual(1);

    // Click mobile menu button (Menu icon)
    // In our mock, lucide icons are SVGs. We can find the button wrapping it.
    const buttons = screen.getAllByRole('button');
    const menuButton = buttons.find(b => b.className.includes('md:hidden'));

    if (menuButton) {
      fireEvent.click(menuButton);
      // Now mobile menu should be open
      // We should see links again, but technically they might just be duplicated.
      // Let's check for a specific mobile-only element or just that state changed.
      // The code maps `isOpen && (...)`.

      // Let's look for the mobile menu container
      const mobileContainer = screen.getByText('+91 63833 76668', { selector: 'div.pt-4 a' });
      // This specific structure appears in mobile menu
      expect(mobileContainer).toBeInTheDocument();

      // Close it
      fireEvent.click(menuButton);
      expect(mobileContainer).not.toBeInTheDocument();
    } else {
        throw new Error("Mobile menu button not found");
    }
  });
});
