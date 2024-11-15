import path from 'path';
import { getCliArgs } from '../utils/cli.js';
import { resolveLoose } from '../utils/resolveLoose.js';
export function createCosmosConfig(rootDir, cosmosConfigInput = {}) {
    return {
        ...cosmosConfigInput,
        rootDir,
        detectLocalPlugins: cosmosConfigInput.detectLocalPlugins ?? true,
        disablePlugins: cosmosConfigInput.disablePlugins ?? false,
        exposeImports: getExposeImports(cosmosConfigInput, rootDir),
        exportPath: getExportPath(cosmosConfigInput, rootDir),
        fixtureFileSuffix: getFixtureFileSuffix(cosmosConfigInput),
        fixturesDir: getFixturesDir(cosmosConfigInput),
        fixturesLocation: cosmosConfigInput.fixturesLocation ?? rootDir,
        globalImports: getGlobalImports(cosmosConfigInput, rootDir),
        hostname: getHostname(cosmosConfigInput),
        https: getHttps(cosmosConfigInput),
        httpsOptions: getHttpsOptions(cosmosConfigInput, rootDir),
        ignore: getIgnore(cosmosConfigInput),
        lazy: getLazy(cosmosConfigInput),
        plugins: getPlugins(cosmosConfigInput, rootDir),
        port: getPort(cosmosConfigInput),
        portRetries: getPortRetries(cosmosConfigInput),
        publicUrl: cosmosConfigInput.publicUrl ?? '',
        rendererUrl: cosmosConfigInput.rendererUrl ?? null,
        staticPath: getStaticPath(cosmosConfigInput, rootDir),
        watchDirs: getWatchDirs(cosmosConfigInput, rootDir),
        dom: getDomConfig(cosmosConfigInput.dom || {}),
        ui: cosmosConfigInput.ui || {},
    };
}
function getExportPath(cosmosConfigInput, rootDir) {
    const { exportPath = 'cosmos-export' } = cosmosConfigInput;
    return path.resolve(rootDir, exportPath);
}
function getStaticPath(cosmosConfigInput, rootDir) {
    const { staticPath = null } = cosmosConfigInput;
    return staticPath && path.resolve(rootDir, staticPath);
}
function getHttps(cosmosConfigInput) {
    const { https = false } = cosmosConfigInput;
    return https;
}
function getHttpsOptions(cosmosConfigInput, rootDir) {
    if (cosmosConfigInput.httpsOptions?.keyPath &&
        cosmosConfigInput.httpsOptions?.certPath) {
        return {
            keyPath: path.resolve(rootDir, cosmosConfigInput.httpsOptions.keyPath),
            certPath: path.resolve(rootDir, cosmosConfigInput.httpsOptions.certPath),
        };
    }
    return null;
}
function getIgnore({ ignore = [] }) {
    return ['**/node_modules/**', ...ignore];
}
function getFixturesDir({ fixturesDir = '__fixtures__' }) {
    return fixturesDir;
}
function getFixtureFileSuffix({ fixtureFileSuffix = 'fixture', }) {
    return fixtureFileSuffix;
}
function getWatchDirs(cosmosConfigInput, rootDir) {
    const { watchDirs = ['.'] } = cosmosConfigInput;
    return watchDirs.map(watchDir => path.resolve(rootDir, watchDir));
}
function getExposeImports(cosmosConfigInput, rootDir) {
    const cliArgs = getCliArgs();
    if (typeof cliArgs.exposeImports === 'boolean') {
        return cliArgs.exposeImports;
    }
    else if (typeof cliArgs.exposeImports === 'string') {
        return path.resolve(rootDir, cliArgs.exposeImports);
    }
    const { exposeImports = false } = cosmosConfigInput;
    return typeof exposeImports === 'string'
        ? path.resolve(rootDir, exposeImports)
        : exposeImports;
}
function getHostname({ hostname = null }) {
    return hostname;
}
function getPort(cosmosConfigInput) {
    const cliArgs = getCliArgs();
    if (typeof cliArgs.port === 'number') {
        return cliArgs.port;
    }
    const { port = 5000 } = cosmosConfigInput;
    return port;
}
function getPortRetries({ portRetries = 10 }) {
    return portRetries;
}
function getGlobalImports(cosmosConfigInput, rootDir) {
    const { globalImports = [] } = cosmosConfigInput;
    return globalImports.map(globalImport => resolveLoose(rootDir, globalImport));
}
function getPlugins(cosmosConfigInput, rootDir) {
    const { plugins = [] } = cosmosConfigInput;
    return plugins.map(plugin => resolveLoose(rootDir, plugin));
}
function getDomConfig(cosmosConfigInput) {
    const { containerQuerySelector = null } = cosmosConfigInput;
    return {
        containerQuerySelector,
    };
}
function getLazy(cosmosConfigInput) {
    const cliArgs = getCliArgs();
    if (typeof cliArgs.lazy === 'boolean') {
        return cliArgs.lazy;
    }
    const { lazy = false } = cosmosConfigInput;
    return lazy;
}
