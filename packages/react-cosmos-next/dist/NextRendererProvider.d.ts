import React from 'react';
import { RendererConfig } from 'react-cosmos-core';
import { SelectedFixture } from 'react-cosmos-renderer';
type Props = {
    children: React.ReactNode;
    rendererConfig: RendererConfig;
    selectedFixture: SelectedFixture | null;
};
export declare function NextRendererProvider({ children, rendererConfig: { rendererUrl, playgroundUrl }, selectedFixture, }: Props): React.JSX.Element;
export {};
