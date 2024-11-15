import { findClassStateFixtureStateItem, } from 'react-cosmos-core';
import { stringifyElementId } from '../../../components/ValueInputTree/index.js';
export function classStateFsItemUpdater(elementId, cb) {
    return prevFs => {
        const fsItem = findClassStateFixtureStateItem(prevFs, elementId);
        if (!fsItem) {
            const elId = stringifyElementId(elementId);
            console.warn(`Trying to update missing element with ID: ${elId}`);
            return prevFs ?? [];
        }
        return cb(prevFs);
    };
}
