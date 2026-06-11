import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';
import * as vitestAxeMatchers from 'vitest-axe/matchers';
import { server } from './msw';

expect.extend(vitestAxeMatchers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
