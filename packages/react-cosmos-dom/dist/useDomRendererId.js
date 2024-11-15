import React from 'react';
import { uuid } from 'react-cosmos-core';
export function useDomRendererId() {
    return React.useMemo(() => getDomRendererId(), []);
}
// Renderer ID is remembered to avoid announcing a new renderer when reloading
// the renderer window. Note that each tab has creates a new session and thus
// a new rendererId.
// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
function getDomRendererId() {
    if (typeof sessionStorage === 'undefined') {
        return uuid();
    }
    let id = sessionStorage.getItem('cosmosRendererId');
    if (!id) {
        id = uuid();
        sessionStorage.setItem('cosmosRendererId', id);
    }
    return id;
}
