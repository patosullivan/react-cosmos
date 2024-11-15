import React from 'react';
import { FixtureId, FlatFixtureTreeItem } from 'react-cosmos-core';
type Props = {
    fixtureItems: FlatFixtureTreeItem[];
    fixtureId: FixtureId;
    navOpen: boolean;
    panelOpen: boolean;
    fixtureActionOrder: string[];
    rendererActionOrder: string[];
    onOpenNav: () => unknown;
    onTogglePanel: () => unknown;
    onReloadRenderer: () => unknown;
    onClose: () => unknown;
};
export declare const RendererHeader: React.NamedExoticComponent<Props>;
export {};
