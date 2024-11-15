import { buildQueryString } from 'react-cosmos-core';
import * as ErrorOverlay from 'react-error-overlay';
const LAUNCH_EDITOR_ENDPOINT = '/_open';
export function init() {
    ErrorOverlay.startReportingRuntimeErrors({
        filename: process.env.PUBLIC_URL + '/main.js',
    });
    ErrorOverlay.setEditorHandler(errorLocation => window.fetch(getLaunchEditorUrl(errorLocation)));
    setUpBuildErrorReporting();
}
export function dismiss() {
    ErrorOverlay.dismissRuntimeErrors();
}
function getLaunchEditorUrl(errorLocation) {
    return `${LAUNCH_EDITOR_ENDPOINT}${buildQueryString({
        filePath: errorLocation.fileName,
        line: errorLocation.lineNumber || 1,
        column: errorLocation.colNumber || 1,
    })}`;
}
function setUpBuildErrorReporting() {
    const clientWindow = window;
    if (clientWindow.__webpack_hot_middleware_reporter__ === undefined) {
        return;
    }
    clientWindow.__webpack_hot_middleware_reporter__.useCustomOverlay({
        showProblems(type, obj) {
            if (type !== 'errors') {
                // We might've went from errors -> warnings
                ErrorOverlay.dismissBuildError();
            }
            else {
                ErrorOverlay.reportBuildError(obj[0]);
            }
        },
        clear() {
            ErrorOverlay.dismissBuildError();
        },
    });
}
