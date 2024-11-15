import http from 'http';
import https from 'https';
import { CosmosConfig } from '../cosmosConfig/types.js';
type RequestListener = (request: http.IncomingMessage, response: http.ServerResponse) => void;
export declare function createHttpServer(cosmosConfig: CosmosConfig, requestListener: RequestListener): Promise<{
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | https.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    start: () => Promise<void>;
    stop: () => Promise<void>;
}>;
export {};
