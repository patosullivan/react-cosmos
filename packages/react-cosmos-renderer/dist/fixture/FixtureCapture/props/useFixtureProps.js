import { isEqual, mapValues } from 'lodash-es';
import React from 'react';
import { DEFAULT_RENDER_KEY, extendWithValues, findPropsFixtureStateItem, getComponentName, } from 'react-cosmos-core';
import { findRelevantElementPaths } from '../shared/findRelevantElementPaths.js';
import { getChildrenPath, setElementAtPath } from '../shared/nodeTree/index.js';
export function useFixtureProps(fixture, propsFs, decoratorId) {
    const propCache = React.useMemo(() => ({}), 
    // React.useMemo is used as a cache invalidated by decoratorId
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [decoratorId]);
    const elPaths = findRelevantElementPaths(fixture);
    return elPaths.reduce((extendedFixture, elPath) => {
        const elementId = { decoratorId, elPath };
        const fsItem = findPropsFixtureStateItem(propsFs, elementId);
        return setElementAtPath(extendedFixture, elPath, element => {
            if (!fsItem || componentTypeChanged(fsItem.componentName)) {
                return {
                    ...element,
                    key: getElRenderKey(elPath, DEFAULT_RENDER_KEY),
                };
            }
            // Prevent overriding child elements with outdated "children" prop values
            // stored in fixture state
            // See https://github.com/react-cosmos/react-cosmos/pull/920 for context
            const originalProps = element.props;
            const extendedProps = extendWithValues(originalProps, fsItem.values);
            // Preserve identity between renders for indentical non-primitive props
            const cachedProps = mapValues(extendedProps, (value, propName) => {
                const key = getPropCacheKey(elPath, propName);
                if (!propCache.hasOwnProperty(key))
                    propCache[key] = originalProps[propName];
                if (isEqual(propCache[key], value))
                    return propCache[key];
                propCache[key] = value;
                return value;
            });
            // HACK alert: Editing React Element by hand
            // This is blasphemy, but there are two reasons why React.cloneElement
            // isn't ideal:
            //   1. Props need to overridden (not merged)
            //   2. element.key has to be set to control whether the prev instance
            //      should be reused or not
            // To be revised in case this approach causes trouble in the future.
            // Useful links:
            //   - https://reactjs.org/docs/react-api.html#cloneelement
            //   - https://github.com/facebook/react/blob/15a8f031838a553e41c0b66eb1bcf1da8448104d/packages/react/src/ReactElement.js#L293-L362
            return {
                ...element,
                props: hasChildElPaths(elPaths, elPath)
                    ? { ...cachedProps, children: originalProps.children }
                    : cachedProps,
                key: getElRenderKey(elPath, fsItem.renderKey),
            };
            function componentTypeChanged(componentName) {
                return componentName !== getComponentName(element.type);
            }
        });
    }, fixture);
}
function getPropCacheKey(elPath, propName) {
    return elPath ? `${elPath}-${propName}` : propName;
}
function getElRenderKey(elPath, renderKey) {
    return `${elPath}-${renderKey}`;
}
function hasChildElPaths(elPaths, elPath) {
    return elPaths.some(p => p.indexOf(getChildrenPath(elPath)) === 0);
}
