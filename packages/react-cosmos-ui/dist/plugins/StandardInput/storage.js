import React from 'react';
const storageKey = 'standardInputTreeExpansion';
const emptyTreeExpansion = {};
// TODO: Persist tree expansion state per fixture ID?
export function useTreeExpansionStorage(pluginContext) {
    const storage = pluginContext.getMethodsOf('storage');
    const expansion = storage.getItem(storageKey) || emptyTreeExpansion;
    const setExpansion = React.useCallback((newTreeExpansion) => storage.setItem(storageKey, newTreeExpansion), [storage]);
    return { expansion, setExpansion };
}
