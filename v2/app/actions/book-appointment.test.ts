import { createBooking } from './book-appointment';

// We mock the prisma client even though it is commented out in the implementation
// to ensure that if it gets uncommented, the test doesn't break or hit a real DB.
jest.mock('@/lib/prisma', () => ({
  prisma: require('../../lib/__mocks__/prisma').default
}));

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
