import { ReactElement } from 'react';
import { CosmosConfig } from '../cosmosConfig/types.js';
export type FixtureApi = {
    absoluteFilePath: string;
    fileName: string;
    getElement: () => ReactElement;
    name: string | null;
    parents: string[];
    playgroundUrl: string;
    relativeFilePath: string;
    rendererUrl: string | null;
    treePath: string[];
};
type Options = {
    rendererUrl?: string;
};
export declare function getFixtures(cosmosConfig: CosmosConfig, options?: Options): Promise<FixtureApi[]>;
export {};
