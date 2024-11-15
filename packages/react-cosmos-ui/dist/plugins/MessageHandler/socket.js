import { rendererSocketMessage, } from 'react-cosmos-core';
let socket = null;
let pendingMessages = [];
export function initSocket(context) {
    const core = context.getMethodsOf('core');
    if (!core.isDevServerOn()) {
        return;
    }
    socket = new WebSocket(location.origin.replace(/^https:/, 'wss:').replace(/^http:/, 'ws:'));
    socket.addEventListener('open', () => {
        if (socket && pendingMessages.length > 0) {
            for (const msg of pendingMessages)
                socket.send(JSON.stringify(msg));
            pendingMessages = [];
        }
    });
    function handleMessage(event) {
        const message = JSON.parse(event.data);
        switch (message.channel) {
            case 'renderer':
                return context.emit('rendererResponse', message.message);
            case 'server':
                return context.emit('serverMessage', message.message);
            default:
                console.log('Unknown socket message', message);
        }
    }
    socket.addEventListener('message', handleMessage);
    return () => {
        if (socket) {
            socket.removeEventListener('message', handleMessage);
            socket.close();
            socket = null;
        }
    };
}
export function postRendererRequest(context, msg) {
    const socketMessage = rendererSocketMessage(msg);
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(socketMessage));
    }
    else {
        pendingMessages.push(socketMessage);
    }
}
