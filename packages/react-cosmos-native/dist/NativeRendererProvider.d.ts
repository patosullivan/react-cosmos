import React from 'react';
import { FixtureId, RendererConfig } from 'react-cosmos-core';
type Props = {
    children: React.ReactNode;
    rendererConfig: RendererConfig;
    initialFixtureId?: FixtureId | null;
};
export declare function NativeRendererProvider({ children, rendererConfig, initialFixtureId, }: Props): React.JSX.Element;
export {};
