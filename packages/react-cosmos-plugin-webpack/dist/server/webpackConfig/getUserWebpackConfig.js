import path from 'node:path';
import { getCliArgs, importModule, moduleExists, } from 'react-cosmos';
import { createWebpackCosmosConfig } from '../cosmosConfig/createWebpackCosmosConfig.js';
import { getDefaultWebpackConfig } from './getDefaultWebpackConfig.js';
import { getWebpackNodeEnv } from './getWebpackNodeEnv.js';
export async function getUserWebpackConfig(cosmosConfig, userWebpack) {
    const baseWebpackConfig = await getBaseWebpackConfig(cosmosConfig, userWebpack);
    const { overridePath } = createWebpackCosmosConfig(cosmosConfig);
    if (!overridePath || !moduleExists(overridePath)) {
        console.log(`[Cosmos] Learn how to override webpack config for cosmos: https://reactcosmos.org/docs/getting-started/webpack#webpack-config-override`);
        return baseWebpackConfig;
    }
    const relPath = path.relative(process.cwd(), overridePath);
    console.log(`[Cosmos] Overriding webpack config at ${relPath}`);
    const module = await importModule(overridePath);
    const webpackOverride = module.default;
    return webpackOverride(baseWebpackConfig, getWebpackNodeEnv());
}
async function getBaseWebpackConfig(cosmosConfig, userWebpack) {
    const { rootDir } = cosmosConfig;
    const { configPath } = createWebpackCosmosConfig(cosmosConfig);
    if (!configPath || !moduleExists(configPath)) {
        console.log('[Cosmos] Using default webpack config');
        return getDefaultWebpackConfig(userWebpack, rootDir);
    }
    const relPath = path.relative(process.cwd(), configPath);
    console.log(`[Cosmos] Using webpack config found at ${relPath}`);
    const module = await importModule(configPath);
    const webpackConfig = module.default;
    // The --env flag matches the webpack CLI convention
    // https://webpack.js.org/api/cli/#env
    const cliArgs = getCliArgs();
    return typeof webpackConfig === 'function'
        ? await webpackConfig(cliArgs.env || getWebpackNodeEnv(), cliArgs)
        : webpackConfig;
}
