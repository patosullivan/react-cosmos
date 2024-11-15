import React, { useCallback } from 'react';
import { createPlugin } from 'react-plugin';
import { getFixtureExpansion, updateElementExpansion, } from '../../components/ValueInputTree/index.js';
import { ClassStatePanel } from './ClassStatePanel/index.js';
import { CLASS_STATE_TREE_EXPANSION_STORAGE_KEY, } from './shared.js';
const { namedPlug, register } = createPlugin({
    name: 'classStatePanel',
});
namedPlug('sidePanelRow', 'classState', ({ pluginContext, slotProps }) => {
    const { fixtureId, getFixtureState, setFixtureState } = slotProps;
    const { fixtureExpansion, onElementExpansionChange } = useFixtureExpansion(pluginContext, fixtureId);
    const fixtureState = getFixtureState('classState');
    const onFixtureStateChange = useCallback(update => setFixtureState('classState', update), [setFixtureState]);
    return (React.createElement(ClassStatePanel, { fixtureState: fixtureState, fixtureExpansion: fixtureExpansion, onFixtureStateChange: onFixtureStateChange, onElementExpansionChange: onElementExpansionChange }));
});
export { register };
if (process.env.NODE_ENV !== 'test')
    register();
const DEFAULT_TREE_EXPANSION = {};
function useFixtureExpansion(context, fixtureId) {
    const { getMethodsOf } = context;
    const storage = getMethodsOf('storage');
    const classStateExpansion = storage.getItem(CLASS_STATE_TREE_EXPANSION_STORAGE_KEY) || DEFAULT_TREE_EXPANSION;
    const fixtureExpansion = getFixtureExpansion(classStateExpansion, fixtureId);
    const onElementExpansionChange = React.useCallback((elementId, treeExpansion) => {
        storage.setItem(CLASS_STATE_TREE_EXPANSION_STORAGE_KEY, updateElementExpansion(classStateExpansion, fixtureId, elementId, treeExpansion));
    }, [storage, classStateExpansion, fixtureId]);
    return {
        fixtureExpansion,
        onElementExpansionChange,
    };
}
