import { omit } from 'lodash-es';
import { requireFromSilent } from '../utils/requireSilent.js';
import { RENDERER_FILENAME } from './constants.js';
import { hasPlugin, isInstanceOfWebpackPlugin } from './plugins.js';
export function ensureHtmlWebackPlugin({ rootDir }, plugins) {
    if (hasPlugin(plugins, 'HtmlWebpackPlugin')) {
        return plugins.map(plugin => isHtmlWebpackPlugin(plugin) ? changeHtmlPluginFilename(plugin) : plugin);
    }
    const htmlWebpackPlugin = getHtmlWebpackPlugin(rootDir);
    if (!htmlWebpackPlugin) {
        return plugins;
    }
    return [
        ...plugins,
        new htmlWebpackPlugin({
            title: 'React Cosmos',
            filename: RENDERER_FILENAME,
        }),
    ];
}
export function getHtmlWebpackPlugin(rootDir) {
    return requireFromSilent(rootDir, 'html-webpack-plugin');
}
function isHtmlWebpackPlugin(plugin) {
    return isInstanceOfWebpackPlugin(plugin, 'HtmlWebpackPlugin');
}
function changeHtmlPluginFilename(htmlPlugin) {
    if (!isIndexHtmlWebpackPlugin(htmlPlugin))
        return htmlPlugin;
    const options = htmlPlugin.userOptions || htmlPlugin.options;
    const safeOptions = omit(options, 'chunks');
    return new htmlPlugin.constructor({
        ...safeOptions,
        filename: RENDERER_FILENAME,
    });
}
function isIndexHtmlWebpackPlugin(htmlPlugin) {
    const { filename } = htmlPlugin.userOptions || htmlPlugin.options;
    return (filename === 'index.html' ||
        typeof filename !== 'string' ||
        filename.endsWith('/index.html'));
}
