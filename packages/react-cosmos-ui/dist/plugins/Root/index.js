import React from 'react';
import { createFixtureTree, flattenFixtureTree } from 'react-cosmos-core';
import { createPlugin } from 'react-plugin';
import { useWelcomeDismiss } from './HomeOverlay/welcomeDismiss.js';
import { Root } from './Root.js';
import { isNavOpen, openNav } from './navOpen.js';
import { getNavWidthApi } from './navWidth.js';
import { isPanelOpen, openPanel } from './panelOpen.js';
import { getPanelWidthApi } from './panelWidth.js';
const { onLoad, plug, register } = createPlugin({
    name: 'root',
    defaultConfig: {
        sidePanelRowOrder: [],
        globalActionOrder: [],
        globalOrder: [],
        navRowOrder: [],
        fixtureActionOrder: [],
        rendererActionOrder: [],
    },
    initialState: {
        storageCacheReady: false,
    },
});
onLoad(context => {
    const storage = context.getMethodsOf('storage');
    const core = context.getMethodsOf('core');
    storage.loadCache(core.getProjectId()).then(() => {
        context.setState({ storageCacheReady: true });
    });
});
onLoad(context => {
    const core = context.getMethodsOf('core');
    return core.registerCommands({
        toggleFixtureList: () => openNav(context, !isNavOpen(context)),
        toggleControlPanel: () => openPanel(context, !isPanelOpen(context)),
    });
});
plug('root', ({ pluginContext }) => {
    const { getConfig, getState, getMethodsOf } = pluginContext;
    const router = getMethodsOf('router');
    const rendererCore = getMethodsOf('rendererCore');
    const fixtureItems = useFixtureItems(pluginContext);
    const onToggleNav = useOpenNav(pluginContext);
    const onTogglePanel = useOpenPanel(pluginContext);
    const welcomeDismiss = useWelcomeDismiss(pluginContext);
    const { storageCacheReady } = getState();
    if (!storageCacheReady)
        return null;
    const { navWidth, setNavWidth } = getNavWidthApi(pluginContext);
    const { panelWidth, setPanelWidth } = getPanelWidthApi(pluginContext);
    const { sidePanelRowOrder, globalActionOrder, globalOrder, navRowOrder, fixtureActionOrder, rendererActionOrder, } = getConfig();
    return (React.createElement(Root, { fixtureItems: fixtureItems, selectedFixtureId: router.getSelectedFixtureId(), rendererConnected: rendererCore.isRendererConnected(), getFixtureState: rendererCore.getFixtureState, setFixtureState: rendererCore.setFixtureState, navOpen: isNavOpen(pluginContext), panelOpen: isPanelOpen(pluginContext), navWidth: navWidth, panelWidth: panelWidth, sidePanelRowOrder: sidePanelRowOrder, globalActionOrder: globalActionOrder, globalOrder: globalOrder, navRowOrder: navRowOrder, fixtureActionOrder: fixtureActionOrder, rendererActionOrder: rendererActionOrder, onToggleNav: onToggleNav, onTogglePanel: onTogglePanel, onReloadRenderer: rendererCore.reloadRenderer, onCloseFixture: router.unselectFixture, setNavWidth: setNavWidth, setPanelWidth: setPanelWidth, welcomeDismissed: welcomeDismiss.isWelcomeDismissed(), onDismissWelcome: welcomeDismiss.onDismissWelcome, onShowWelcome: welcomeDismiss.onShowWelcome }));
});
export { register };
if (process.env.NODE_ENV !== 'test')
    register();
function useFixtureItems(context) {
    const { getMethodsOf } = context;
    const core = getMethodsOf('core');
    const { fixturesDir, fixtureFileSuffix } = core.getFixtureFileVars();
    const rendererCore = getMethodsOf('rendererCore');
    const fixtures = rendererCore.getFixtures();
    return React.useMemo(() => flattenFixtureTree(createFixtureTree({ fixturesDir, fixtureFileSuffix, fixtures })), [fixtureFileSuffix, fixtures, fixturesDir]);
}
function useOpenNav(context) {
    return React.useCallback(() => {
        openNav(context, !isNavOpen(context));
    }, [context]);
}
function useOpenPanel(context) {
    return React.useCallback(() => {
        openPanel(context, !isPanelOpen(context));
    }, [context]);
}
