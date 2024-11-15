import { FixtureId, FixtureState, RendererId } from 'react-cosmos-core';
import { RendererCoreContext } from './index.js';
export declare function postReloadRendererRequest(context: RendererCoreContext, rendererId: RendererId): void;
export declare function postSelectFixtureRequest(context: RendererCoreContext, rendererId: RendererId, fixtureId: FixtureId, fixtureState: FixtureState): void;
export declare function postUnselectFixtureRequest(context: RendererCoreContext, rendererId: RendererId): void;
export declare function postSetFixtureStateRequest(context: RendererCoreContext, rendererId: RendererId, fixtureId: FixtureId, fixtureState: FixtureState): void;
