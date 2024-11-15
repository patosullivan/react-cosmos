import { findPropsFixtureStateItem, } from 'react-cosmos-core';
import { stringifyElementId } from '../../../components/ValueInputTree/index.js';
export function propsFsItemUpdater(elementId, cb) {
    return prevFs => {
        const fsItem = findPropsFixtureStateItem(prevFs, elementId);
        if (!fsItem) {
            const elId = stringifyElementId(elementId);
            console.warn(`Trying to update missing element with ID: ${elId}`);
            return prevFs ?? [];
        }
        return cb(prevFs);
    };
}
