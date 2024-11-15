import { vi } from 'vitest';
export async function mockFetch(httpStatus, cb) {
    const w = window;
    const origFetch = window.fetch;
    w.fetch = vi.fn(async () => ({ status: httpStatus }));
    await cb(w.fetch);
    w.fetch = origFetch;
}
