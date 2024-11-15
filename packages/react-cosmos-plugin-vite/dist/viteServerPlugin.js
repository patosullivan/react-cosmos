import { viteConfigPlugin } from './viteConfigPlugin.js';
import { viteDevServerPlugin } from './viteDevServerPlugin.js';
import { viteExportPlugin } from './viteExportPlugin.js';
const viteServerPlugin = {
    name: 'vite',
    config: viteConfigPlugin,
    devServer: viteDevServerPlugin,
    export: viteExportPlugin,
};
export default viteServerPlugin;
