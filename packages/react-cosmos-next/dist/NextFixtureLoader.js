import React, { Suspense } from 'react';
import { decodeRendererUrlFixture, } from 'react-cosmos-core';
import { ServerFixtureLoader } from 'react-cosmos-renderer';
import { NextRendererProvider } from './NextRendererProvider.js';
export function NextFixtureLoader({ rendererConfig, moduleWrappers, params, }) {
    const fixtureId = getFixtureIdFromPageParams(params);
    const selectedFixture = fixtureId && {
        fixtureId,
        initialFixtureState: {},
        // This fixture loader is meant to work with Next.js build-time static
        // generation. Its props will be driven by finite URL segment params and not
        // query strings, which are inherently dynamic. This means we can't receive
        // an incrementing renderKey here. Instead, we'll rely solely on the fixture
        // ID as the fixture render key and will not support refreshing the current
        // fixture by selecting it again.
        renderKey: 0,
    };
    return (React.createElement(Suspense, null,
        React.createElement(NextRendererProvider, { rendererConfig: rendererConfig, selectedFixture: selectedFixture },
            React.createElement(ServerFixtureLoader, { moduleWrappers: moduleWrappers, renderMessage: renderMessage, selectedFixture: selectedFixture }))));
}
function getFixtureIdFromPageParams(params) {
    return params.fixture && params.fixture !== 'index'
        ? decodeRendererUrlFixture(decodeURIComponent(params.fixture))
        : null;
}
const containerStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, Ubuntu, "Helvetica Neue", Helvetica, sans-serif',
    fontSize: 14,
};
function renderMessage(msg) {
    return React.createElement("div", { style: containerStyle }, msg);
}
