import { CosmosConfig } from 'react-cosmos';
export type CosmosViteConfig = {
    configPath: string | false;
    indexPath: string | null;
    port: number;
};
type CosmosViteConfigInput = Partial<CosmosViteConfig>;
export declare function createCosmosViteConfig(cosmosConfig: CosmosConfig): CosmosViteConfig;
export declare function getCosmosVitePort(cosmosViteConfig: CosmosViteConfigInput): number;
export {};
