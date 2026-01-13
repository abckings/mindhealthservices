// v2/app/contactus/page.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ContactUs from './page';

describe('ContactUs Page', () => {
  const originalOpen = window.open;

  beforeAll(() => {
    window.open = jest.fn();
  });

  afterAll(() => {
    window.open = originalOpen;
  });

  it('renders contact form correctly', () => {
    render(<ContactUs />);
    expect(screen.getByText('Quick Enquiry')).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('updates form state on user input', () => {
    render(<ContactUs />);
    const nameInput = screen.getByLabelText(/your name/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect((nameInput as HTMLInputElement).value).toBe('John Doe');
  });

  it('triggers WhatsApp action', () => {
    render(<ContactUs />);
    // "WhatsApp" text is on the button, but might also be in the description.
    // Use getByRole to be specific.
    const waButton = screen.getByRole('button', { name: /whatsapp/i });
    fireEvent.click(waButton);
    expect(window.open).toHaveBeenCalled();
  });
});
