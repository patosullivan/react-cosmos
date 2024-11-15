import React from 'react';
import { createPlugin } from 'react-plugin';
import { RemoteButton } from './RemoteButton/index.js';
const { onLoad, on, namedPlug, register } = createPlugin({
    name: 'remoteRenderer',
});
on('messageHandler', {
    rendererResponse: (context, msg) => {
        const rendererCore = context.getMethodsOf('rendererCore');
        rendererCore.receiveResponse(msg);
    },
});
on('rendererCore', {
    request: (context, msg) => {
        postRendererRequest(context, msg);
    },
});
onLoad(context => {
    // Discover remote renderers by asking all to announce themselves
    postRendererRequest(context, {
        type: 'pingRenderers',
    });
});
namedPlug('globalAction', 'remoteRenderer', ({ pluginContext }) => {
    const { getMethodsOf } = pluginContext;
    const core = getMethodsOf('core');
    const rendererCore = getMethodsOf('rendererCore');
    const notifications = getMethodsOf('notifications');
    return (React.createElement(RemoteButton, { devServerOn: core.isDevServerOn(), rendererUrl: rendererCore.getRendererUrl(), pushNotification: notifications.pushTimedNotification }));
});
export { register };
if (process.env.NODE_ENV !== 'test')
    register();
function postRendererRequest(context, msg) {
    const msgHandler = context.getMethodsOf('messageHandler');
    msgHandler.postRendererRequest(msg);
}
