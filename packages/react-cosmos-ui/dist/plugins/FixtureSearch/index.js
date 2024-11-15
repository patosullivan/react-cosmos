import React from 'react';
import { createPlugin } from 'react-plugin';
import { FixtureSearchHeader } from './FixtureSearchHeader.js';
import { FixtureSearchOverlay } from './FixtureSearchOverlay.js';
const { onLoad, namedPlug, register } = createPlugin({
    name: 'fixtureSearch',
    initialState: {
        open: false,
        searchText: '',
    },
});
onLoad(pluginContext => {
    const { getMethodsOf, setState } = pluginContext;
    const core = getMethodsOf('core');
    return core.registerCommands({
        searchFixtures: () => setState(prevState => ({ ...prevState, open: !prevState.open })),
    });
});
namedPlug('navRow', 'fixtureSearch', ({ pluginContext, slotProps }) => {
    const { getMethodsOf } = pluginContext;
    const router = getMethodsOf('router');
    const rendererCore = getMethodsOf('rendererCore');
    const fixtures = rendererCore.getFixtures();
    const onOpen = useOnOpen(pluginContext);
    const { onCloseNav } = slotProps;
    // No point in showing fixture search button unless user has fixtures
    if (Object.keys(fixtures).length === 0) {
        return null;
    }
    return (React.createElement(FixtureSearchHeader, { fixtureSelected: router.getSelectedFixtureId() !== null, onOpen: onOpen, onCloseNav: onCloseNav }));
});
namedPlug('global', 'fixtureSearch', ({ pluginContext }) => {
    const { getState, getMethodsOf } = pluginContext;
    const { open, searchText } = getState();
    const core = getMethodsOf('core');
    const router = getMethodsOf('router');
    const { fixturesDir, fixtureFileSuffix } = core.getFixtureFileVars();
    const rendererCore = getMethodsOf('rendererCore');
    const fixtures = rendererCore.getFixtures();
    const onSetSearchText = useOnSetSearchText(pluginContext);
    const onClose = useOnClose(pluginContext);
    const onSelect = useOnSelect(pluginContext);
    if (!open) {
        return null;
    }
    return (React.createElement(FixtureSearchOverlay, { searchText: searchText, fixturesDir: fixturesDir, fixtureFileSuffix: fixtureFileSuffix, fixtures: fixtures, selectedFixtureId: router.getSelectedFixtureId(), onSetSearchText: onSetSearchText, onClose: onClose, onSelect: onSelect }));
});
export { register };
if (process.env.NODE_ENV !== 'test')
    register();
function useOnSetSearchText({ setState }) {
    return React.useCallback((newSearchText) => {
        setState(prevState => ({ ...prevState, searchText: newSearchText }));
    }, [setState]);
}
function useOnOpen({ setState }) {
    return React.useCallback(() => setState(prevState => ({ ...prevState, open: true })), [setState]);
}
function useOnClose({ setState }) {
    return React.useCallback(() => setState(prevState => ({ ...prevState, open: false })), [setState]);
}
function useOnSelect(context) {
    const { setState, getMethodsOf } = context;
    const router = getMethodsOf('router');
    const fixtureTree = getMethodsOf('fixtureTree');
    return React.useCallback((fixtureId, revealFixture) => {
        router.selectFixture(fixtureId);
        if (revealFixture) {
            fixtureTree.revealFixture(fixtureId);
        }
        setState(prevState => ({ ...prevState, open: false }));
    }, [setState, fixtureTree, router]);
}
