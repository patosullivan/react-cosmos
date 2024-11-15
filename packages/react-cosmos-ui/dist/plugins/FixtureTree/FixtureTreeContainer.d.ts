import React from 'react';
import { FixtureId, FixtureList } from 'react-cosmos-core';
import { TreeExpansion } from '../../shared/treeExpansion.js';
type Props = {
    fixturesDir: string;
    fixtureFileSuffix: string;
    selectedFixtureId: null | FixtureId;
    fixtures: FixtureList;
    expansion: TreeExpansion;
    selectFixture: (fixtureId: FixtureId) => void;
    setExpansion: (expansion: TreeExpansion) => unknown;
};
export declare function FixtureTreeContainer({ fixturesDir, fixtureFileSuffix, selectedFixtureId, fixtures, expansion, selectFixture, setExpansion, }: Props): React.JSX.Element;
export {};
