import React from 'react';
import { FixtureId, RendererConfig, UserModuleWrappers } from 'react-cosmos-core';
type Props = {
    rendererConfig: RendererConfig;
    moduleWrappers: UserModuleWrappers;
    initialFixtureId?: FixtureId;
};
export declare function NativeFixtureLoader({ rendererConfig, moduleWrappers, initialFixtureId, }: Props): React.JSX.Element;
export {};
