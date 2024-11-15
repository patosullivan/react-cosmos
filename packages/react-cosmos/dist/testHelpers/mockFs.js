import path from 'node:path';
import { vi } from 'vitest';
import { getCwdPath } from './cwd.js';
vi.mock('../utils/fs', async () => {
    const actual = (await vi.importActual('../utils/fs'));
    let mocked = false;
    let fileMocks = {};
    let dirMocks = [];
    async function importModule(moduleId) {
        if (!mocked)
            return actual.importModule(moduleId);
        if (!fileMocks.hasOwnProperty(moduleId) &&
            !fileMocks.hasOwnProperty(`${moduleId}.js`)) {
            throw new Error(`Cannot find module '${moduleId}'`);
        }
        return fileMocks[moduleId] || fileMocks[`${moduleId}.js`];
    }
    async function importJson(filePath) {
        if (!mocked)
            return actual.importJson(filePath);
        if (!fileMocks.hasOwnProperty(filePath)) {
            throw new Error(`Cannot find JSON '${filePath}'`);
        }
        return fileMocks[filePath];
    }
    function moduleExists(moduleId) {
        if (!mocked)
            return actual.moduleExists(moduleId);
        return (fileMocks.hasOwnProperty(moduleId) ||
            fileMocks.hasOwnProperty(`${moduleId}.js`));
    }
    function fileExists(filePath) {
        if (!mocked)
            return actual.fileExists(filePath);
        return fileMocks.hasOwnProperty(filePath);
    }
    function dirExists(dirPath) {
        if (!mocked)
            return actual.dirExists(dirPath);
        return dirMocks.indexOf(dirPath) !== -1;
    }
    return {
        importModule,
        importJson,
        moduleExists,
        fileExists,
        dirExists,
        __mockFile(filePath, fileMock) {
            mocked = true;
            fileMocks = { ...fileMocks, [filePath]: fileMock };
        },
        __mockJson(filePath, jsonMock) {
            mocked = true;
            fileMocks = { ...fileMocks, [filePath]: jsonMock };
        },
        __mockDir(dirPath) {
            mocked = true;
            dirMocks = [...dirMocks, dirPath];
        },
        __resetMock() {
            fileMocks = {};
            dirMocks = [];
        },
    };
});
export async function mockFile(filePath, fileMock) {
    (await importMocked()).__mockFile(filePath, fileMock);
    (await importMocked()).__mockDir(path.dirname(filePath));
}
export async function mockCosmosConfig(cosmosConfigPath, cosmosConfig) {
    const absPath = getCwdPath(cosmosConfigPath);
    await mockFile(absPath, cosmosConfig);
}
export async function mockCwdModuleDefault(filePath, fileMock) {
    const absPath = getCwdPath(filePath);
    await mockFile(absPath, { default: fileMock });
}
export async function resetFsMock() {
    (await importMocked()).__resetMock();
}
async function importMocked() {
    return import('../utils/fs.js');
}
