import React from 'react';
import { RendererConfig, UserModuleWrappers } from 'react-cosmos-core';
import { NextCosmosParams } from './nextTypes.js';
type Args = {
    rendererConfig: RendererConfig;
    moduleWrappers: UserModuleWrappers;
};
export declare function nextCosmosPage({ rendererConfig, moduleWrappers }: Args): ({ params }: {
    params: NextCosmosParams;
}) => React.JSX.Element;
export {};
