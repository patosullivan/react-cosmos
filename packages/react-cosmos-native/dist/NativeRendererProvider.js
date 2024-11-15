import React from 'react';
import { createWebSocketsConnect } from 'react-cosmos-renderer';
import { StatefulRendererProvider } from 'react-cosmos-renderer/client';
import { DevSettings } from 'react-native';
import { getSocketUrl } from './getSocketUrl.js';
export function NativeRendererProvider({ children, rendererConfig, initialFixtureId = null, }) {
    const rendererConnect = React.useMemo(() => createWebSocketsConnect(getSocketUrl(rendererConfig.playgroundUrl)), [rendererConfig.playgroundUrl]);
    return (React.createElement(StatefulRendererProvider
    // TODO: Generate unique ID per device
    , { 
        // TODO: Generate unique ID per device
        rendererId: "native-renderer", rendererConnect: rendererConnect, locked: false, selectedFixtureId: initialFixtureId, reloadRenderer: reloadRenderer }, children));
}
function reloadRenderer() {
    DevSettings.reload();
}
