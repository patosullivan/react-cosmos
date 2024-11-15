import { ByPath, ReactDecoratorModule, ReactFixtureModule } from 'react-cosmos-core';
import { CosmosConfig } from '../cosmosConfig/types.js';
type UserModules = {
    fixtures: ByPath<ReactFixtureModule>;
    decorators: ByPath<ReactDecoratorModule>;
};
export declare function importUserModules({ rootDir, fixturesDir, fixturesLocation, fixtureFileSuffix, ignore, }: CosmosConfig): Promise<UserModules>;
export {};
