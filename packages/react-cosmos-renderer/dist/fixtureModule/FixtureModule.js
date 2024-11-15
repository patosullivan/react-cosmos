import React from 'react';
import { getFixtureFromExport, getFixtureItemFromExport, pickSerializableValues, stringifyFixtureId, } from 'react-cosmos-core';
import { DecoratedFixture } from './DecoratedFixture.js';
import { FixtureProvider } from './FixtureProvider.js';
export function FixtureModule({ fixtureModule, decoratorModules, globalDecorators, fixtureId, initialFixtureState, renderKey, lazy, renderMessage, }) {
    const fixtureItem = React.useMemo(() => getFixtureItemFromExport(fixtureModule.default), [fixtureModule.default]);
    const fixtureKey = React.useMemo(() => `${stringifyFixtureId(fixtureId)}-${renderKey}`, [fixtureId, renderKey]);
    const fixture = getFixtureFromExport(fixtureModule.default, fixtureId.name);
    const { options = {} } = fixtureModule;
    const serializableOptions = React.useMemo(() => pickSerializableValues(options), [options]);
    if (typeof fixture === 'undefined') {
        return renderMessage(`Invalid fixture name: ${fixtureId.name}`);
    }
    return (React.createElement(FixtureProvider, { key: fixtureKey, fixtureId: fixtureId, initialFixtureState: initialFixtureState, fixtureItem: fixtureItem, fixtureOptions: serializableOptions, lazy: lazy },
        React.createElement(DecoratedFixture, { fixture: fixture, fixtureOptions: options, userDecoratorModules: decoratorModules, globalDecorators: globalDecorators })));
}
