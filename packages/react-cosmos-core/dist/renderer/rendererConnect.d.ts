import { FixtureState } from '../fixtureState/types.js';
import { FixtureId, FixtureList, FixtureListItem } from '../userModules/fixtureTypes.js';
export type RendererId = string;
export type PingRenderersRequest = {
    type: 'pingRenderers';
};
export type ReloadRendererRequest = {
    type: 'reloadRenderer';
    payload: {
        rendererId: RendererId;
    };
};
export type SelectFixtureRequest = {
    type: 'selectFixture';
    payload: {
        rendererId: RendererId;
        fixtureId: FixtureId;
        fixtureState: FixtureState;
    };
};
export type UnselectFixtureRequest = {
    type: 'unselectFixture';
    payload: {
        rendererId: RendererId;
    };
};
export type SetFixtureStateRequest = {
    type: 'setFixtureState';
    payload: {
        rendererId: RendererId;
        fixtureId: FixtureId;
        fixtureState: FixtureState;
    };
};
export type RendererRequest = PingRenderersRequest | ReloadRendererRequest | SelectFixtureRequest | UnselectFixtureRequest | SetFixtureStateRequest;
export type RendererReadyResponse = {
    type: 'rendererReady';
    payload: {
        rendererId: RendererId;
        selectedFixtureId?: FixtureId | null;
    };
};
export type RendererErrorResponse = {
    type: 'rendererError';
    payload: {
        rendererId: RendererId;
    };
};
export type FixtureListUpdateResponse = {
    type: 'fixtureListUpdate';
    payload: {
        rendererId: RendererId;
        fixtures: FixtureList;
    };
};
export type FixtureLoadedResponse = {
    type: 'fixtureLoaded';
    payload: {
        rendererId: RendererId;
        fixture: FixtureListItem;
        fixtureOptions: {};
    };
};
export type FixtureStateChangeResponse = {
    type: 'fixtureStateChange';
    payload: {
        rendererId: RendererId;
        fixtureId: FixtureId;
        fixtureState: FixtureState;
    };
};
export type PlaygroundCommandResponse = {
    type: 'playgroundCommand';
    payload: {
        command: string;
    };
};
export type RendererResponse = RendererReadyResponse | RendererErrorResponse | FixtureLoadedResponse | FixtureListUpdateResponse | FixtureStateChangeResponse | PlaygroundCommandResponse;
export type RendererConnect<Request = RendererRequest, Response = RendererResponse> = {
    postMessage: (msg: Response) => unknown;
    onMessage(handler: (msg: Request) => unknown): () => void;
};
