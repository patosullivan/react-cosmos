import { RendererConnect, RendererResponse } from 'react-cosmos-core';
declare global {
    interface Window {
        cosmosRendererResponse?: (msg: RendererResponse) => void;
    }
}
export declare function createWebSocketsConnect(url: string): RendererConnect;
