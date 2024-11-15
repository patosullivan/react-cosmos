import React, { useMemo } from 'react';
import { FixtureCapture } from '../fixture/FixtureCapture/FixtureCapture.js';
import { createFixtureNode } from './createFixtureNode.js';
import { decorateFixture } from './decorateFixture.js';
export function DecoratedFixture({ fixture, fixtureOptions, userDecoratorModules, globalDecorators = [], }) {
    return useMemo(() => {
        const decorators = [
            ...globalDecorators,
            ...userDecoratorModules.map(m => m.default).flat(),
        ];
        return decorateFixture(React.createElement(FixtureCapture, { decoratorId: "root" }, createFixtureNode(fixture)), fixtureOptions, decorators);
    }, [fixture, fixtureOptions, globalDecorators, userDecoratorModules]);
}
