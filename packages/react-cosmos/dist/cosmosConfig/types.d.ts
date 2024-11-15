import { CosmosRendererUrl } from 'react-cosmos-core';
interface HttpsOptions {
    keyPath: string;
    certPath: string;
}
export type CosmosDomConfig = {
    containerQuerySelector: null | string;
};
export type CosmosConfig = {
    exportPath: string;
    detectLocalPlugins: boolean;
    disablePlugins: boolean;
    dom: CosmosDomConfig;
    exposeImports: boolean | string;
    fixtureFileSuffix: string;
    fixturesDir: string;
    fixturesLocation: string;
    globalImports: string[];
    hostname: null | string;
    https: boolean;
    httpsOptions: null | HttpsOptions;
    ignore: string[];
    lazy: boolean;
    port: number;
    portRetries: number;
    plugins: string[];
    publicUrl: string;
    rendererUrl: CosmosRendererUrl;
    rootDir: string;
    staticPath: null | string;
    watchDirs: string[];
    [option: string]: unknown;
    ui: {
        [pluginName: string]: {};
    };
};
export type CosmosDomConfigInput = Partial<CosmosDomConfig>;
export type CosmosConfigInput = Partial<CosmosConfig>;
export {};
