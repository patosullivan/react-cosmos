import http from 'http';
import { ServerMessage } from 'react-cosmos-core';
export declare function createMessageHandler(httpServer: http.Server): {
    sendMessage: (msg: ServerMessage) => void;
    close: () => void;
};
