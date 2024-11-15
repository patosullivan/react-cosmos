import { Mock } from 'vitest';
export declare function mockFetch(httpStatus: number, cb: (fetchMock: Mock) => Promise<unknown>): Promise<void>;
