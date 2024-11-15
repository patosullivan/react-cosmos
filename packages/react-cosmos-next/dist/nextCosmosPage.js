import React from 'react';
import { NextFixtureLoader } from './NextFixtureLoader.js';
export function nextCosmosPage({ rendererConfig, moduleWrappers }) {
    return function NextCosmosPage({ params }) {
        return (React.createElement(NextFixtureLoader, { rendererConfig: rendererConfig, moduleWrappers: moduleWrappers, params: params }));
    };
}
