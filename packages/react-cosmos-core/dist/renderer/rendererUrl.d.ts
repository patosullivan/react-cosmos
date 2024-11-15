import { CosmosCommand } from '../server/serverTypes.js';
import { FixtureId } from '../userModules/fixtureTypes.js';
export type CosmosRendererUrl = null | string | {
    dev: string;
    export: string;
};
export declare function createRendererUrl(rendererUrl: string, fixtureId?: FixtureId, locked?: boolean): string;
export declare function pickRendererUrl(rendererUrl: undefined | CosmosRendererUrl, command: CosmosCommand): null | string;
export declare function encodeRendererUrlFixture(fixtureId: FixtureId): string;
export declare function decodeRendererUrlFixture(fixture: string): FixtureId;
