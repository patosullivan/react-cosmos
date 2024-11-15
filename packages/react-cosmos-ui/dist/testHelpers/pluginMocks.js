import { getPluginContext, } from 'react-plugin';
import { vi } from 'vitest';
import { getMethodsOf, mockMethodsOf, on } from './pluginHelpers.js';
export function getRouterContext() {
    return getPluginContext('router');
}
export function getMessageHandlerContext() {
    return getPluginContext('messageHandler');
}
export function getRendererCoreContext() {
    return getPluginContext('rendererCore');
}
export function getRouterMethods() {
    return getMethodsOf('router');
}
export function getMessageHandlerMethods() {
    return getMethodsOf('messageHandler');
}
export function getCoreMethods() {
    return getMethodsOf('core');
}
export function getRendererCoreMethods() {
    return getMethodsOf('rendererCore');
}
export function getNotificationsMethods() {
    return getMethodsOf('notifications');
}
export function getRendererPreviewMethods() {
    return getMethodsOf('rendererPreview');
}
export function mockStorage(methods = {}) {
    const allMethods = {
        loadCache: vi.fn(),
        getItem: vi.fn(),
        setItem: vi.fn(),
        ...methods,
    };
    mockMethodsOf('storage', allMethods);
    return allMethods;
}
export function mockRouter(methods = {}) {
    const allMethods = {
        getSelectedFixtureId: vi.fn(),
        selectFixture: vi.fn(),
        unselectFixture: vi.fn(),
        ...methods,
    };
    mockMethodsOf('router', allMethods);
    return allMethods;
}
export function mockCore(methods = {}) {
    const allMethods = {
        registerCommands: () => vi.fn(),
        runCommand: () => vi.fn(),
        getProjectId: vi.fn(),
        getFixtureFileVars: vi.fn(),
        isDevServerOn: vi.fn(),
        ...methods,
    };
    mockMethodsOf('core', allMethods);
    return allMethods;
}
export function mockMessageHandler(methods = {}) {
    const allMethods = {
        postRendererRequest: vi.fn(),
        ...methods,
    };
    mockMethodsOf('messageHandler', allMethods);
    return allMethods;
}
export function mockRendererCore(methods = {}) {
    const allMethods = {
        getRendererUrl: vi.fn(),
        getConnectedRendererIds: vi.fn(),
        getPrimaryRendererId: vi.fn(),
        getFixtures: vi.fn(),
        isRendererConnected: vi.fn(),
        reloadRenderer: vi.fn(),
        selectPrimaryRenderer: vi.fn(),
        receiveResponse: vi.fn(),
        getAllFixtureState: vi.fn(),
        getFixtureState: vi.fn(),
        setFixtureState: vi.fn(),
        setGlobalFixtureState: vi.fn(),
        ...methods,
    };
    mockMethodsOf('rendererCore', allMethods);
    return allMethods;
}
export function mockRendererPreview(methods = {}) {
    const allMethods = {
        getUrlStatus: vi.fn(),
        getRuntimeStatus: vi.fn(),
        ...methods,
    };
    mockMethodsOf('rendererPreview', allMethods);
    return allMethods;
}
export function mockNotifications(methods = {}) {
    const allMethods = {
        pushStickyNotification: vi.fn(),
        removeStickyNotification: vi.fn(),
        pushTimedNotification: vi.fn(),
        ...methods,
    };
    mockMethodsOf('notifications', allMethods);
    return allMethods;
}
export function mockFixtureTree(methods = {}) {
    const allMethods = {
        revealFixture: vi.fn(),
        ...methods,
    };
    mockMethodsOf('fixtureTree', allMethods);
    return allMethods;
}
export function onRouter(events = {}) {
    const allEvents = {
        fixtureSelect: vi.fn(),
        fixtureReselect: vi.fn(),
        fixtureUnselect: vi.fn(),
        ...events,
    };
    on('router', allEvents);
    return allEvents;
}
export function onMessageHandler(events = {}) {
    const allEvents = {
        serverMessage: vi.fn(),
        rendererResponse: vi.fn(),
        ...events,
    };
    on('messageHandler', allEvents);
    return allEvents;
}
export function onRendererCore(events = {}) {
    const allEvents = {
        request: vi.fn(),
        response: vi.fn(),
        ...events,
    };
    on('rendererCore', allEvents);
    return allEvents;
}
