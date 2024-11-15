import path from 'path';
import { replaceKeys } from 'react-cosmos-core';
import { slash } from '../utils/slash.js';
// NOTE: These can be made configurable if a proper need arises
const FIXTURE_PATTERNS = [
    '**/<fixturesDir>/**/*.{js,jsx,ts,tsx,md,mdx}',
    '**/{*.,}<fixtureFileSuffix>.{js,jsx,ts,tsx,md,mdx}',
];
const DECORATOR_PATTERNS = ['**/cosmos.decorator.{js,jsx,ts,tsx}'];
export function getFixturePatterns(fixturesDir, fixtureFileSuffix) {
    return FIXTURE_PATTERNS.map(pattern => replaceKeys(pattern, {
        '<fixturesDir>': fixturesDir,
        '<fixtureFileSuffix>': fixtureFileSuffix,
    }));
}
export function getDecoratorPatterns() {
    return DECORATOR_PATTERNS;
}
export function createImportMap(paths, rootDir, relativeToDir) {
    return paths.reduce((acc, p) => ({
        ...acc,
        [importKeyPath(p, rootDir)]: importPath(p, relativeToDir),
    }), {});
}
export function importKeyPath(filePath, rootDir) {
    // Converting to forward slashes on Windows is important because the
    // slashes are used for generating a sorted list of fixtures and
    // decorators.
    return slash(path.relative(rootDir, filePath));
}
export function importPath(filePath, relativeToDir) {
    return slash(relativeToDir
        ? `.${path.sep}${path.relative(relativeToDir, filePath)}`
        : filePath);
}
