import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

// We need to install jest-mock-extended to use this efficiently, or write a manual mock.
// Since I didn't install jest-mock-extended, I will write a simpler manual mock for now.

const prisma = {
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  account: {
    findFirst: jest.fn(),
  },
  session: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
  verificationToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
  appointment: {
    create: jest.fn(),
    findMany: jest.fn(),
  }
};

export default prisma;
