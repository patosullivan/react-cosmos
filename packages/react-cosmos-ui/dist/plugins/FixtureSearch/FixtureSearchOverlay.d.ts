import React from 'react';
import { FixtureId, FixtureList } from 'react-cosmos-core';
type Props = {
    searchText: string;
    fixturesDir: string;
    fixtureFileSuffix: string;
    fixtures: FixtureList;
    selectedFixtureId: null | FixtureId;
    onSetSearchText: (searchText: string) => unknown;
    onClose: () => unknown;
    onSelect: (fixtureId: FixtureId, revealFixture: boolean) => unknown;
};
export declare function FixtureSearchOverlay({ searchText, fixturesDir, fixtureFileSuffix, fixtures, selectedFixtureId, onSetSearchText, onClose, onSelect, }: Props): React.JSX.Element;
export {};
