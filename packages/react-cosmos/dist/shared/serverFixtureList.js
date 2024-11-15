import { findUserModulePaths } from '../userModules/findUserModulePaths.js';
import { importKeyPath } from '../userModules/shared.js';
let fixtureListCache = null;
export async function getServerFixtureList(cosmosConfig) {
    if (!fixtureListCache) {
        const { fixturePaths } = await findUserModulePaths(cosmosConfig);
        fixtureListCache = createFixtureList(cosmosConfig.rootDir, fixturePaths);
    }
    return fixtureListCache;
}
export function updateFixtureListCache(rootDir, fixturePaths) {
    fixtureListCache = createFixtureList(rootDir, fixturePaths);
}
function createFixtureList(rootDir, fixturePaths) {
    return fixturePaths.reduce((acc, fixturePath) => ({
        ...acc,
        [importKeyPath(fixturePath, rootDir)]: { type: 'single' },
    }), {});
}
