import { rendererSocketMessage, } from 'react-cosmos-core';
export function createWebSocketsConnect(url) {
    let pendingMessages = [];
    const socket = new WebSocket(url);
    socket.addEventListener('open', () => {
        if (pendingMessages.length > 0) {
            pendingMessages.forEach(msg => socket.send(JSON.stringify(msg)));
            pendingMessages = [];
        }
    });
    return {
        postMessage(rendererResponse) {
            const socketMessage = rendererSocketMessage(rendererResponse);
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(socketMessage));
            }
            else {
                pendingMessages.push(socketMessage);
            }
            // Allow headless browsers to capture renderer responses
            if (window.cosmosRendererResponse) {
                window.cosmosRendererResponse(rendererResponse);
            }
        },
        onMessage(onMessage) {
            function handleMessage(msg) {
                const socketMessage = JSON.parse(msg.data);
                if (socketMessage.channel === 'renderer') {
                    onMessage(socketMessage.message);
                }
            }
            socket.addEventListener('message', handleMessage);
            return () => socket.removeEventListener('message', handleMessage);
        },
    };
}
