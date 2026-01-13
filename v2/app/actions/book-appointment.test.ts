import { createBooking } from './book-appointment';

// Since the action is "use server", we are testing the logic.
// However, 'use server' components often need environment context, but here it's just a function.
// The current implementation is mocked/stubbed, so we test the stub.

describe('createBooking Server Action', () => {
  it('validates input and returns success', async () => {
    const data = {
      date: '2023-10-27',
      time: '10:00',
      serviceId: 'service-123',
    };

    const result = await createBooking(data);
    expect(result).toEqual({ success: true });
  });

  it('throws error on invalid input', async () => {
    const data = {
      date: '2023-10-27',
      // time missing
      serviceId: 'service-123',
    };

    // Zod throws error
    await expect(createBooking(data as any)).rejects.toThrow();
  });
});
