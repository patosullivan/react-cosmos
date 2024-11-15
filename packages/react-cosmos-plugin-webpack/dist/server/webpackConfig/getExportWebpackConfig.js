import path from 'path';
import { createWebpackCosmosConfig } from '../cosmosConfig/createWebpackCosmosConfig.js';
import { getUserWebpackConfig } from './getUserWebpackConfig.js';
import { getWebpackConfigModule } from './getWebpackConfigModule.js';
import { getWebpackConfigResolve } from './getWebpackConfigResolve.js';
import { ensureHtmlWebackPlugin } from './htmlPlugin.js';
import { getGlobalsPlugin, ignoreEmptyWebpackPlugins } from './plugins.js';
import { resolveWebpackClientPath } from './resolveWebpackClientPath.js';
import { ensureWebpackConfigTopLevelAwait } from './webpackConfigTopLevelAwait.js';
export async function getExportWebpackConfig(cosmosConfig, userWebpack) {
    const baseWebpackConfig = await getUserWebpackConfig(cosmosConfig, userWebpack);
    return {
        ...baseWebpackConfig,
        entry: getEntry(),
        output: getOutput(cosmosConfig),
        module: getWebpackConfigModule(cosmosConfig, baseWebpackConfig),
        resolve: getWebpackConfigResolve(cosmosConfig, baseWebpackConfig),
        plugins: getPlugins(cosmosConfig, baseWebpackConfig, userWebpack),
        experiments: getExperiments(baseWebpackConfig),
    };
}
function getEntry() {
    // The React devtools hook needs to be imported before any other module that
    // might import React
    const devtoolsHook = resolveWebpackClientPath('reactDevtoolsHook.js');
    const clientIndex = resolveWebpackClientPath('index.js');
    return [devtoolsHook, clientIndex];
}
function getOutput(cosmosConfig) {
    const { exportPath, publicUrl } = cosmosConfig;
    const { includeHashInOutputFilename } = createWebpackCosmosConfig(cosmosConfig);
    return {
        path: path.join(exportPath, publicUrl),
        filename: includeHashInOutputFilename
            ? '[name].[contenthash].js'
            : '[name].js',
        publicPath: publicUrl,
    };
}
function getPlugins(cosmosConfig, baseWebpackConfig, userWebpack) {
    const existingPlugins = ignoreEmptyWebpackPlugins(baseWebpackConfig.plugins);
    const globalsPlugin = getGlobalsPlugin(cosmosConfig, userWebpack, false);
    const noEmitErrorsPlugin = new userWebpack.NoEmitOnErrorsPlugin();
    return ensureHtmlWebackPlugin(cosmosConfig, [
        ...existingPlugins,
        globalsPlugin,
        noEmitErrorsPlugin,
    ]);
}
function getExperiments(baseWebpackConfig) {
    return ensureWebpackConfigTopLevelAwait(baseWebpackConfig);
}
