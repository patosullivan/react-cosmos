import { get } from 'lodash-es';
import { isReactElement } from 'react-cosmos-core';
import { isRootPath } from './shared.js';
// Why be silent about trying to fetch a node that isn't an element?
// Because users of this utility only care about elements. Whether the child
// node was removed or replaced by a different type of node (eg. string,
// array of elements, etc.) is irrelevant.
// NICETOHAVE: Assert child path validity
export function getElementAtPath(node, elPath) {
    if (!isReactElement(node) && !Array.isArray(node)) {
        return null;
    }
    const rootNode = node;
    const childNode = isRootPath(elPath) ? rootNode : get(rootNode, elPath);
    if (!isReactElement(childNode)) {
        return null;
    }
    return childNode;
}
export function getExpectedElementAtPath(node, elPath) {
    const el = getElementAtPath(node, elPath);
    if (!el) {
        throw new Error(`Element not found at path: ${elPath}`);
    }
    return el;
}
