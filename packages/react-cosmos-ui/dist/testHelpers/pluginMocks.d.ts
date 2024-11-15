import { PluginEventHandlers, PluginMethodHandlers, PluginWithEvents, PluginWithMethods } from 'react-plugin';
import { CoreSpec } from '../plugins/Core/spec.js';
import { FixtureTreeSpec } from '../plugins/FixtureTree/spec.js';
import { MessageHandlerSpec } from '../plugins/MessageHandler/spec.js';
import { NotificationsSpec } from '../plugins/Notifications/spec.js';
import { RendererCoreSpec } from '../plugins/RendererCore/spec.js';
import { RendererPreviewSpec } from '../plugins/RendererPreview/spec.js';
import { RouterSpec } from '../plugins/Router/spec.js';
import { StorageSpec } from '../plugins/Storage/spec.js';
type MethodsOf<Spec extends PluginWithMethods> = Partial<PluginMethodHandlers<Spec>>;
type EventsOf<Spec extends PluginWithEvents> = PluginEventHandlers<any, Spec>;
export declare function getRouterContext(): import("react-plugin").PluginContext<RouterSpec>;
export declare function getMessageHandlerContext(): import("react-plugin").PluginContext<MessageHandlerSpec>;
export declare function getRendererCoreContext(): import("react-plugin").PluginContext<RendererCoreSpec>;
export declare function getRouterMethods(): {
    getSelectedFixtureId(): null | import("react-cosmos-core").FixtureId;
    selectFixture(fixtureId: import("react-cosmos-core").FixtureId): void;
    unselectFixture(): void;
};
export declare function getMessageHandlerMethods(): {
    postRendererRequest(msg: import("react-cosmos-core").MessageType): unknown;
};
export declare function getCoreMethods(): {
    registerCommands(commands: import("../plugins/Core/spec.js").Commands): () => void;
    runCommand(name: string): unknown;
    getProjectId(): string;
    getFixtureFileVars(): {
        fixturesDir: string;
        fixtureFileSuffix: string;
    };
    isDevServerOn(): boolean;
};
export declare function getRendererCoreMethods(): {
    getRendererUrl(): null | string;
    getConnectedRendererIds(): import("react-cosmos-core").RendererId[];
    getPrimaryRendererId(): null | import("react-cosmos-core").RendererId;
    getFixtures(): import("react-cosmos-core").FixtureList;
    isRendererConnected(): boolean;
    reloadRenderer(): void;
    selectPrimaryRenderer(primaryRendererId: import("react-cosmos-core").RendererId): void;
    receiveResponse(msg: import("react-cosmos-core").MessageType): void;
    getAllFixtureState(): import("react-cosmos-core").FixtureState;
    getFixtureState: import("../plugins/RendererCore/spec.js").GetFixtureState;
    setFixtureState: import("../plugins/RendererCore/spec.js").SetFixtureStateByName;
    setGlobalFixtureState<T>(name: string, state: T): void;
};
export declare function getNotificationsMethods(): {
    pushStickyNotification(notification: import("../plugins/Notifications/spec.js").NotificationItem): void;
    removeStickyNotification(notificationId: string): void;
    pushTimedNotification(notification: import("../plugins/Notifications/spec.js").NotificationItem): void;
};
export declare function getRendererPreviewMethods(): {
    getRuntimeStatus(): import("../plugins/RendererPreview/spec.js").RuntimeStatus;
};
export declare function mockStorage(methods?: MethodsOf<StorageSpec>): {
    loadCache: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<StorageSpec>, projectId: string) => Promise<unknown>);
    getItem: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<StorageSpec>, key: string) => unknown);
    setItem: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<StorageSpec>, key: string, value: unknown) => void);
};
export declare function mockRouter(methods?: MethodsOf<RouterSpec>): {
    getSelectedFixtureId: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RouterSpec>) => import("react-cosmos-core").FixtureId | null);
    selectFixture: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RouterSpec>, fixtureId: import("react-cosmos-core").FixtureId) => void);
    unselectFixture: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RouterSpec>) => void);
};
export declare function mockCore(methods?: MethodsOf<CoreSpec>): {
    registerCommands: (() => import("vitest").Mock<(...args: any[]) => any>) | ((context: import("react-plugin").PluginContext<CoreSpec>, commands: import("../plugins/Core/spec.js").Commands) => () => void);
    runCommand: (context: import("react-plugin").PluginContext<CoreSpec>, name: string) => unknown;
    getProjectId: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<CoreSpec>) => string);
    getFixtureFileVars: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<CoreSpec>) => {
        fixturesDir: string;
        fixtureFileSuffix: string;
    });
    isDevServerOn: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<CoreSpec>) => boolean);
};
export declare function mockMessageHandler(methods?: MethodsOf<MessageHandlerSpec>): {
    postRendererRequest: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<MessageHandlerSpec>, msg: import("react-cosmos-core").MessageType) => unknown);
};
export declare function mockRendererCore(methods?: MethodsOf<RendererCoreSpec>): {
    getRendererUrl: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererCoreSpec>) => string | null);
    getConnectedRendererIds: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererCoreSpec>) => string[]);
    getPrimaryRendererId: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererCoreSpec>) => string | null);
    getFixtures: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererCoreSpec>) => import("react-cosmos-core").FixtureList);
    isRendererConnected: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererCoreSpec>) => boolean);
    reloadRenderer: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererCoreSpec>) => void);
    selectPrimaryRenderer: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererCoreSpec>, primaryRendererId: string) => void);
    receiveResponse: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererCoreSpec>, msg: import("react-cosmos-core").MessageType) => void);
    getAllFixtureState: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererCoreSpec>) => import("react-cosmos-core").FixtureState);
    getFixtureState: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererCoreSpec>, name: string) => unknown);
    setFixtureState: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererCoreSpec>, name: string, change: unknown) => void);
    setGlobalFixtureState: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererCoreSpec>, name: string, state: unknown) => void);
};
export declare function mockRendererPreview(methods?: MethodsOf<RendererPreviewSpec>): {
    getRuntimeStatus: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<RendererPreviewSpec>) => import("../plugins/RendererPreview/spec.js").RuntimeStatus);
    getUrlStatus: import("vitest").Mock<(...args: any[]) => any>;
};
export declare function mockNotifications(methods?: MethodsOf<NotificationsSpec>): {
    pushStickyNotification: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<NotificationsSpec>, notification: import("../plugins/Notifications/spec.js").NotificationItem) => void);
    removeStickyNotification: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<NotificationsSpec>, notificationId: string) => void);
    pushTimedNotification: import("vitest").Mock<(...args: any[]) => any> | ((context: import("react-plugin").PluginContext<NotificationsSpec>, notification: import("../plugins/Notifications/spec.js").NotificationItem) => void);
};
export declare function mockFixtureTree(methods?: MethodsOf<FixtureTreeSpec>): {
    revealFixture: import("vitest").Mock<(...args: any[]) => any> | ((context: {
        pluginName: "fixtureTree";
        getMethodsOf: <T extends import("react-plugin").PluginSpec>(pluginName: T["name"]) => T["methods"] extends import("ui-plugin/dist/types/PluginSpec.js").PluginMethods ? T["methods"] : never;
    }, fixtureId: import("react-cosmos-core").FixtureId) => unknown);
};
export declare function onRouter(events?: EventsOf<RouterSpec>): {
    fixtureSelect: import("vitest").Mock<(...args: any[]) => any> | import("ui-plugin/dist/types/PluginContextHandlers.js").PluginEventHandler<any, [fixtureId: import("react-cosmos-core").FixtureId]>;
    fixtureReselect: import("vitest").Mock<(...args: any[]) => any> | import("ui-plugin/dist/types/PluginContextHandlers.js").PluginEventHandler<any, [fixtureId: import("react-cosmos-core").FixtureId]>;
    fixtureUnselect: import("vitest").Mock<(...args: any[]) => any> | import("ui-plugin/dist/types/PluginContextHandlers.js").PluginEventHandler<any, []>;
};
export declare function onMessageHandler(events?: EventsOf<MessageHandlerSpec>): {
    serverMessage: import("vitest").Mock<(...args: any[]) => any> | import("ui-plugin/dist/types/PluginContextHandlers.js").PluginEventHandler<any, [msg: import("react-cosmos-core").MessageType]>;
    rendererResponse: import("vitest").Mock<(...args: any[]) => any> | import("ui-plugin/dist/types/PluginContextHandlers.js").PluginEventHandler<any, [msg: import("react-cosmos-core").MessageType]>;
};
export declare function onRendererCore(events?: EventsOf<RendererCoreSpec>): {
    request: import("vitest").Mock<(...args: any[]) => any> | import("ui-plugin/dist/types/PluginContextHandlers.js").PluginEventHandler<any, [msg: import("react-cosmos-core").MessageType]>;
    response: import("vitest").Mock<(...args: any[]) => any> | import("ui-plugin/dist/types/PluginContextHandlers.js").PluginEventHandler<any, [msg: import("react-cosmos-core").MessageType]>;
};
export {};
