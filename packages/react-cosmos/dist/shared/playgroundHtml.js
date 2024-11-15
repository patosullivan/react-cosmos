import fs from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { pickRendererUrl, replaceKeys, } from 'react-cosmos-core';
import { findUp } from '../utils/findUp.js';
import { getServerFixtureList } from './serverFixtureList.js';
import { getStaticPath } from './staticPath.js';
export async function getDevPlaygroundHtml(platform, cosmosConfig, pluginConfigs) {
    const { ui } = cosmosConfig;
    return getPlaygroundHtml({
        playgroundConfig: {
            ...ui,
            core: await getCoreConfig(cosmosConfig, true),
            rendererCore: {
                fixtures: await getServerFixtureList(cosmosConfig),
                rendererUrl: platform === 'web'
                    ? pickRendererUrl(cosmosConfig.rendererUrl, 'dev')
                    : null,
            },
        },
        pluginConfigs,
    });
}
export async function getExportPlaygroundHtml(cosmosConfig, pluginConfigs) {
    const { ui } = cosmosConfig;
    return getPlaygroundHtml({
        playgroundConfig: {
            ...ui,
            core: await getCoreConfig(cosmosConfig, false),
            rendererCore: {
                fixtures: await getServerFixtureList(cosmosConfig),
                rendererUrl: pickRendererUrl(cosmosConfig.rendererUrl, 'export'),
            },
        },
        pluginConfigs,
    });
}
async function getCoreConfig(cosmosConfig, devServerOn) {
    const { rootDir, fixturesDir, fixtureFileSuffix } = cosmosConfig;
    return {
        projectId: await getProjectId(rootDir),
        fixturesDir,
        fixtureFileSuffix,
        devServerOn,
    };
}
async function getProjectId(rootDir) {
    const pkgPath = await findUp('package.json', rootDir);
    if (!pkgPath) {
        return rootDir.split(path.sep).pop();
    }
    try {
        const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
        return pkg.name || 'new-project';
    }
    catch (err) {
        console.log('Failed to read package.json');
        console.log(err);
        return 'new-project';
    }
}
function getPlaygroundHtml(playgroundArgs) {
    return replaceKeys(getPlaygroundHtmlTemplate(), {
        __PLAYGROUND_ARGS: JSON.stringify(playgroundArgs),
    });
}
function getPlaygroundHtmlTemplate() {
    return fs.readFileSync(getStaticPath('index.html'), 'utf8');
}
