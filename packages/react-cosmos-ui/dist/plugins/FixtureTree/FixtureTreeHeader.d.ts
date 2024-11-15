import React from 'react';
import { FixtureList } from 'react-cosmos-core';
import { TreeExpansion } from '../../shared/treeExpansion.js';
type Props = {
    fixturesDir: string;
    fixtureFileSuffix: string;
    fixtures: FixtureList;
    expansion: TreeExpansion;
    setExpansion: (treeExpansion: TreeExpansion) => unknown;
};
export declare function FixtureTreeHeader({ fixturesDir, fixtureFileSuffix, fixtures, expansion, setExpansion, }: Props): React.JSX.Element;
export {};
