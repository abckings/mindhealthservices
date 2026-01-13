// v2/app/contactus/page.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('updates form state on user input', async () => {
    const user = userEvent.setup();
    render(<ContactUs />);
    const nameInput = screen.getByLabelText(/your name/i);
    await user.type(nameInput, 'John Doe');
    expect((nameInput as HTMLInputElement).value).toBe('John Doe');
  });

  it('triggers WhatsApp action', async () => {
    const user = userEvent.setup();
    render(<ContactUs />);
    const waButton = screen.getByRole('button', { name: /whatsapp/i });
    await user.click(waButton);
    expect(window.open).toHaveBeenCalled();
  });
});
