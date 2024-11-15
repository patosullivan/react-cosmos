import { CosmosServerPlugin } from '../cosmosPlugin/types.js';
export type CosmosFixtureJson = {
    filePath: string;
    cleanPath: string[];
    rendererUrl: string;
};
export type CosmosFixturesJson = {
    rendererUrl: string | null;
    fixtures: CosmosFixtureJson[];
};
export declare const fixturesJsonPlugin: CosmosServerPlugin;
