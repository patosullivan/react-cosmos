import { clone, setWith } from 'lodash-es';
import { stringifyFixtureId, } from 'react-cosmos-core';
import { stringifyElementId } from './shared.js';
const DEFAULT_EXPANSION = {};
export function getFixtureExpansion(groupExpansion, fixtureId) {
    return groupExpansion[stringifyFixtureId(fixtureId)] || DEFAULT_EXPANSION;
}
export function updateElementExpansion(groupExpansion, fixtureId, elementId, treeExpansion) {
    const valuePath = createElementExpansionPath(fixtureId, elementId);
    // Inspired by https://github.com/lodash/lodash/issues/1696#issuecomment-328335502
    return setWith(clone(groupExpansion), valuePath, treeExpansion, clone);
}
function createElementExpansionPath(fixtureId, elementId) {
    const strFixtureId = stringifyFixtureId(fixtureId);
    const strElementId = stringifyElementId(elementId);
    return [strFixtureId, strElementId];
}
