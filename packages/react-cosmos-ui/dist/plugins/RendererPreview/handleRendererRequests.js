const notificationId = 'renderer-location-change';
export function createRendererRequestHandler() {
    let state = null;
    function postRendererRequest(pluginContext, msg) {
        if (!state)
            return;
        const { iframeRef } = state;
        if (iframeRef.contentWindow) {
            const iframeWindow = iframeRef.contentWindow;
            if (msg.type === 'selectFixture' &&
                iframeLocationChanged(iframeWindow, iframeRef.src)) {
                const notifications = getNotificationMethods(pluginContext);
                notifications.removeStickyNotification(notificationId);
                iframeWindow.location.replace(iframeRef.src);
            }
            else {
                iframeWindow.postMessage(msg, '*');
            }
        }
    }
    function setIframeRef(pluginContext, iframeRef) {
        if (state)
            state.iframeRef.removeEventListener('load', state.onIframeLoad);
        if (iframeRef) {
            state = {
                iframeRef,
                onIframeLoad(e) {
                    const iframe = e.target;
                    const iframeWindow = iframe.contentWindow;
                    if (iframeWindow) {
                        const notifications = getNotificationMethods(pluginContext);
                        if (iframeLocationChanged(iframeWindow, iframe.src)) {
                            notifications.pushStickyNotification({
                                id: notificationId,
                                type: 'info',
                                title: 'Renderer iframe location changed',
                                info: `Select a fixture to reset your preview.`,
                            });
                        }
                        else {
                            notifications.removeStickyNotification(notificationId);
                        }
                    }
                },
            };
            iframeRef.addEventListener('load', state.onIframeLoad);
        }
        else {
            state = null;
        }
    }
    return { postRendererRequest, setIframeRef };
}
function iframeLocationChanged(iframeWindow, iframeSrc) {
    // We cannot read the iframe location when the iframe doesn't have the same
    // origin as the main frame, due to cross-origin browser security. In this
    // case we return false to avoid entering an infinite loop.
    if (iframeSrc.indexOf('http') === 0 &&
        !iframeSrc.match(window.location.origin)) {
        return false;
    }
    try {
        const { href } = iframeWindow.location;
        return (
        // Don't register a location change when renderer searchParams change
        !href.startsWith(
        // Some static servers strip .html extensions automatically
        // https://github.com/zeit/serve-handler/tree/ce35fcd4e1c67356348f4735eed88fb084af9b43#cleanurls-booleanarray
        iframeSrc.replace(/\.html$/, '')));
    }
    catch (err) {
        // An exception is thrown when trying to access the location of a
        // cross-origin frame, which signals that the iframe location host changed.
        return true;
    }
}
function getNotificationMethods(pluginContext) {
    return pluginContext.getMethodsOf('notifications');
}
