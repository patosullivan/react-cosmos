import { vi } from 'vitest';
export async function mockConsole(cb) {
    const expectedLogs = [];
    const origConsoleLog = console.log;
    console.log = vi.fn((...args) => {
        if (typeof args[0] !== 'string' || !expectedLogs.includes(args[0])) {
            origConsoleLog(...args);
        }
    });
    const cbReturn = await cb({
        expectLog: (msg) => expectedLogs.push(msg),
    });
    expectedLogs.forEach(msg => expect(console.log).toBeCalledWith(msg));
    console.log = origConsoleLog;
    return cbReturn;
}
