import { mapValues } from 'lodash-es';
import path from 'path';
import { buildPlaygroundQueryString, createFixtureTree, createRendererUrl, flattenFixtureTree, getFixtureFromExport, getFixtureListFromExports, getSortedDecoratorsForFixturePath, } from 'react-cosmos-core';
import { createFixtureNode, decorateFixture } from 'react-cosmos-renderer';
import { getPlaygroundUrl } from '../shared/playgroundUrl.js';
import { importUserModules } from './importUserModules.js';
export async function getFixtures(cosmosConfig, options = {}) {
    const { fixtures, decorators } = await importUserModules(cosmosConfig);
    const fixtureExports = mapValues(fixtures, f => f.default);
    const decoratorExports = mapValues(decorators, f => f.default);
    const result = [];
    getFlatFixtureTree(cosmosConfig, fixtureExports).forEach(({ fileName, fixtureId, name, parents }) => {
        const fixtureExport = fixtures[fixtureId.path].default;
        const fixtureOptions = fixtures[fixtureId.path].options ?? {};
        const fixture = getFixtureFromExport(fixtureExport, fixtureId.name);
        if (!fixture) {
            throw new Error(`Could not read fixture: ${JSON.stringify(fixtureId)}`);
        }
        const treePath = [...parents, fileName];
        if (name)
            treePath.push(name);
        result.push({
            absoluteFilePath: path.join(cosmosConfig.rootDir, fixtureId.path),
            fileName,
            getElement: createFixtureElementGetter(fixture, fixtureOptions, fixtureId.path, decoratorExports),
            name,
            parents,
            playgroundUrl: getPlaygroundFixtureUrl(cosmosConfig, fixtureId),
            relativeFilePath: fixtureId.path,
            rendererUrl: options.rendererUrl
                ? createRendererUrl(options.rendererUrl, fixtureId)
                : null,
            treePath,
        });
    });
    return result;
}
function getFlatFixtureTree(cosmosConfig, fixtures) {
    const { fixturesDir, fixtureFileSuffix } = cosmosConfig;
    return flattenFixtureTree(createFixtureTree({
        fixtures: getFixtureListFromExports(fixtures),
        fixturesDir,
        fixtureFileSuffix,
    }));
}
function getPlaygroundFixtureUrl(cosmosConfig, fixtureId) {
    const baseUrl = getPlaygroundUrl(cosmosConfig);
    const query = buildPlaygroundQueryString({ fixtureId });
    return `${baseUrl}/${query}`;
}
function createFixtureElementGetter(fixture, fixtureOptions, fixturePath, decoratorsByPath) {
    const decorators = getSortedDecoratorsForFixturePath(fixturePath, decoratorsByPath);
    return () => decorateFixture(createFixtureNode(fixture), fixtureOptions, decorators.flat());
}
