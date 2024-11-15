import { FixtureList } from 'react-cosmos-core';
import { CosmosConfig } from '../cosmosConfig/types.js';
export declare function getServerFixtureList(cosmosConfig: CosmosConfig): Promise<FixtureList>;
export declare function updateFixtureListCache(rootDir: string, fixturePaths: string[]): void;
