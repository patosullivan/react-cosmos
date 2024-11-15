import { resolveWebpackClientPath } from './resolveWebpackClientPath.js';
import { resolveWebpackLoaderPath } from './resolveWebpackLoaderPath.js';
export function getWebpackConfigModule(cosmosConfig, webpackConfig) {
    return {
        ...webpackConfig.module,
        rules: getRules(cosmosConfig, webpackConfig),
    };
}
function getRules(cosmosConfig, { module }) {
    const existingRules = (module && module.rules) || [];
    return [...existingRules, getUserImportsLoaderRule(cosmosConfig)];
}
function getUserImportsLoaderRule(cosmosConfig) {
    return {
        loader: resolveWebpackLoaderPath(),
        include: resolveWebpackClientPath('userImports.js'),
        options: { cosmosConfig },
    };
}
