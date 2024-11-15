import React, { useCallback, useEffect } from 'react';
import { createPlugin } from 'react-plugin';
import { OpenFixtureButton } from './OpenFixtureButton.js';
const { namedPlug, register } = createPlugin({
    name: 'openFixture',
});
namedPlug('rendererAction', 'openFixture', ({ pluginContext, slotProps }) => {
    const { getMethodsOf } = pluginContext;
    const core = getMethodsOf('core');
    const devServerOn = core.isDevServerOn();
    const onOpen = useOpen(pluginContext, slotProps.fixtureId, devServerOn);
    useEffect(() => {
        return core.registerCommands({ openFixture: onOpen });
    }, [core, onOpen]);
    if (!devServerOn) {
        return null;
    }
    return React.createElement(OpenFixtureButton, { onClick: onOpen });
});
export { register };
if (process.env.NODE_ENV !== 'test')
    register();
function useOpen(context, fixtureId, devServerOn) {
    const onError = useErrorNotification(context);
    return useCallback(() => {
        if (!devServerOn)
            return onError('Static exports cannot access source files.');
        openFile(fixtureId.path)
            .then(httpStatus => {
            switch (httpStatus) {
                case 200:
                    // No need to notify when everything is OK
                    return;
                case 400:
                    return onError('This looks like a bug. Please let us know!');
                case 404:
                    return onError('File is missing. Weird!');
                default:
                    return onError('Does your OS know to open source files with your code editor?');
            }
        })
            .catch(err => onError('Is the Cosmos server running?'));
    }, [fixtureId.path, onError, devServerOn]);
}
function useErrorNotification(context) {
    const { getMethodsOf } = context;
    const notifications = getMethodsOf('notifications');
    const { pushTimedNotification } = notifications;
    return useCallback((info) => pushTimedNotification({
        id: 'edit-fixture',
        type: 'error',
        title: 'Failed to open fixture',
        info,
    }), [pushTimedNotification]);
}
async function openFile(filePath) {
    const url = `/_open?filePath=${filePath}`;
    const { status } = await fetch(url, { credentials: 'same-origin' });
    return status;
}
