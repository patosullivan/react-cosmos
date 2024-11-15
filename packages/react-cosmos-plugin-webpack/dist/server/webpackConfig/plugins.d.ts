import { CosmosConfig } from 'react-cosmos';
import webpack from 'webpack';
export declare function getGlobalsPlugin({ publicUrl }: CosmosConfig, userWebpack: typeof webpack, devServerOn: boolean): webpack.DefinePlugin;
export declare function hasPlugin(plugins: void | webpack.WebpackPluginInstance[], pluginName: string): boolean | void;
export declare function isInstanceOfWebpackPlugin(plugin: webpack.WebpackPluginInstance, constructorName: string): boolean;
export declare function ignoreEmptyWebpackPlugins(plugins?: webpack.Configuration['plugins']): webpack.WebpackPluginInstance[];
