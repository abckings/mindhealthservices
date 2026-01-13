import { render, screen } from '@testing-library/react';
import Footer from './Footer';

// Mock Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('Footer', () => {
  it('renders footer content', () => {
    render(<Footer />);
    expect(screen.getByText('RAJ MIND HEALTH SERVICES')).toBeInTheDocument();
    // Use getAllByText because "Contact Us" appears in link and header
    expect(screen.getAllByText('Quick Links').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact Us').length).toBeGreaterThan(0);

    // Check links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Who We Are')).toBeInTheDocument();

    // Check contact info
    expect(screen.getByText(/Kattupakkam, Chennai 56/i)).toBeInTheDocument();
  });
});
