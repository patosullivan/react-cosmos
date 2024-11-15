import React from 'react';
import { RendererConfig, UserModuleWrappers } from 'react-cosmos-core';
import { NextCosmosParams } from './nextTypes.js';
type Props = {
    rendererConfig: RendererConfig;
    moduleWrappers: UserModuleWrappers;
    params: NextCosmosParams;
};
export declare function NextFixtureLoader({ rendererConfig, moduleWrappers, params, }: Props): React.JSX.Element;
export {};
