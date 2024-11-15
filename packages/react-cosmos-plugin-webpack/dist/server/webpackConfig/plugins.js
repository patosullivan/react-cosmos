import { getWebpackNodeEnv } from './getWebpackNodeEnv.js';
export function getGlobalsPlugin({ publicUrl }, userWebpack, devServerOn) {
    const cleanPublicUrl = removeTrailingSlash(publicUrl);
    return new userWebpack.DefinePlugin({
        // "if (__DEV__)" blocks get stripped when compiling a static export build
        __DEV__: JSON.stringify(devServerOn),
        'process.env.NODE_ENV': JSON.stringify(getWebpackNodeEnv()),
        'process.env.PUBLIC_URL': JSON.stringify(cleanPublicUrl),
    });
}
export function hasPlugin(plugins, pluginName) {
    return (plugins &&
        plugins.filter(p => isInstanceOfWebpackPlugin(p, pluginName)).length > 0);
}
export function isInstanceOfWebpackPlugin(plugin, constructorName) {
    return plugin.constructor && plugin.constructor.name === constructorName;
}
export function ignoreEmptyWebpackPlugins(plugins = []) {
    return plugins.filter(Boolean);
}
function removeTrailingSlash(url) {
    return url.replace(/\/$/, '');
}
