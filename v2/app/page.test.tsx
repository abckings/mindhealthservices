import { render, screen } from '@testing-library/react';
import Home from './page';

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('Home Page', () => {
  it('renders hero section with main title', () => {
    render(<Home />);
    expect(screen.getByText(/Empowering Minds/i)).toBeInTheDocument();
    expect(screen.getByText(/Enabling Growth/i)).toBeInTheDocument();
  });

  it('renders call to action buttons', () => {
    render(<Home />);
    expect(screen.getByText('Explore Our Services')).toBeInTheDocument();
    expect(screen.getByText('Book an Appointment')).toBeInTheDocument();
  });

  it('renders core services summary', () => {
    render(<Home />);
    expect(screen.getByText('Our Core Services')).toBeInTheDocument();
    expect(screen.getByText('One to One Counselling')).toBeInTheDocument();
    expect(screen.getByText('Special Education')).toBeInTheDocument();
    expect(screen.getByText('Career Guidance')).toBeInTheDocument();
  });

  it('renders quote section', () => {
    render(<Home />);
    expect(screen.getByText(/If a Child can't learn the way we teach/i)).toBeInTheDocument();
    expect(screen.getByText(/- Ignacio Estrada/i)).toBeInTheDocument();
  });
});
