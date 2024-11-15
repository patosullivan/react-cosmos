import React from 'react';
import { createPlugin } from 'react-plugin';
import { RendererPreview } from './RendererPreview.js';
import { createRendererRequestHandler } from './handleRendererRequests.js';
import { handleWindowMessages } from './handleWindowMessages.js';
const { postRendererRequest, setIframeRef } = createRendererRequestHandler();
const { onLoad, on, plug, register } = createPlugin({
    name: 'rendererPreview',
    initialState: {
        runtimeStatus: 'pending',
    },
    methods: {
        getRuntimeStatus,
    },
});
on('rendererCore', {
    request: postRendererRequest,
});
onLoad((context) => {
    const rendererUrl = getRendererUrl(context);
    if (!rendererUrl) {
        return null;
    }
    return [handleWindowMessages(context)];
});
plug('rendererPreview', ({ pluginContext }) => {
    function handleIframeRef(ref) {
        setIframeRef(pluginContext, ref);
    }
    return (React.createElement(RendererPreview, { rendererUrl: getRendererUrl(pluginContext), rendererConnected: getRendererConnected(pluginContext), runtimeStatus: pluginContext.getState().runtimeStatus, onIframeRef: handleIframeRef }));
});
export { register };
if (process.env.NODE_ENV !== 'test')
    register();
function getRuntimeStatus({ getState }) {
    return getState().runtimeStatus;
}
function getRendererUrl({ getMethodsOf }) {
    return getMethodsOf('rendererCore').getRendererUrl();
}
function getRendererConnected({ getMethodsOf }) {
    return getMethodsOf('rendererCore').isRendererConnected();
}
