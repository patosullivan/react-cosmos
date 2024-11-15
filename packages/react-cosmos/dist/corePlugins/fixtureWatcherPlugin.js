import fs from 'node:fs/promises';
import path from 'node:path';
import { pickRendererUrl, } from 'react-cosmos-core';
import { getPlaygroundUrl } from '../shared/playgroundUrl.js';
import { updateFixtureListCache } from '../shared/serverFixtureList.js';
import { findUserModulePaths } from '../userModules/findUserModulePaths.js';
import { startFixtureWatcher } from '../userModules/fixtureWatcher.js';
import { generateUserImports } from '../userModules/generateUserImports.js';
import { moduleExists } from '../utils/fs.js';
export const fixtureWatcherPlugin = {
    name: 'fixtureWatcher',
    async devServer({ cosmosConfig, platform }) {
        const exposeImports = shouldExposeImports(platform, cosmosConfig);
        if (exposeImports) {
            const modulePaths = await findUserModulePaths(cosmosConfig);
            await generateImportsFile(cosmosConfig, 'dev', modulePaths);
        }
        const watcher = await startFixtureWatcher(cosmosConfig, 'all', async () => {
            const modulePaths = await findUserModulePaths(cosmosConfig);
            updateFixtureListCache(cosmosConfig.rootDir, modulePaths.fixturePaths);
            if (exposeImports) {
                generateImportsFile(cosmosConfig, 'dev', modulePaths);
            }
        });
        return async () => {
            await watcher.close();
        };
    },
    async export({ cosmosConfig }) {
        if (shouldExposeImports('web', cosmosConfig)) {
            const modulePaths = await findUserModulePaths(cosmosConfig);
            await generateImportsFile(cosmosConfig, 'export', modulePaths);
        }
    },
};
function shouldExposeImports(platform, cosmosConfig) {
    return platform === 'native' || Boolean(cosmosConfig.exposeImports);
}
async function generateImportsFile(cosmosConfig, command, modulePaths) {
    const { exposeImports } = cosmosConfig;
    const filePath = typeof exposeImports === 'string'
        ? exposeImports
        : getDefaultFilePath(cosmosConfig.rootDir);
    const typeScript = /\.tsx?$/.test(filePath);
    const rendererConfig = {
        playgroundUrl: getPlaygroundUrl(cosmosConfig),
        rendererUrl: pickRendererUrl(cosmosConfig.rendererUrl, command),
    };
    const fileSource = generateUserImports({
        cosmosConfig,
        modulePaths,
        rendererConfig,
        relativeToDir: path.dirname(filePath),
        typeScript,
    });
    await fs.writeFile(filePath, fileSource, 'utf8');
    const relModulesPath = path.relative(process.cwd(), filePath);
    console.log(`[Cosmos] Generated ${relModulesPath}`);
}
function getDefaultFilePath(rootDir) {
    const ext = moduleExists('typescript') ? 'ts' : 'js';
    return path.join(rootDir, `cosmos.imports.${ext}`);
}
