// v2/__mocks__/next/navigation.ts
export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
}));

export const usePathname = jest.fn(() => '/');

export const useSearchParams = jest.fn(() => ({
  get: jest.fn(),
}));

export const redirect = jest.fn();
