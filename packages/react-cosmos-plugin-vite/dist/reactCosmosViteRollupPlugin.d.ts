import { CosmosConfig } from 'react-cosmos';
import { Plugin } from 'rollup';
import { CosmosViteConfig } from './createCosmosViteConfig.js';
export declare const userImportsVirtualModuleId = "virtual:cosmos-imports";
export declare const userImportsResolvedModuleId: string;
export declare function reactCosmosViteRollupPlugin(cosmosConfig: CosmosConfig, cosmosViteConfig: CosmosViteConfig): Plugin;
