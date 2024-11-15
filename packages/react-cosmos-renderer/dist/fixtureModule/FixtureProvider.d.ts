import React from 'react';
import { FixtureId, FixtureListItem, FixtureState } from 'react-cosmos-core';
type Props = {
    children: React.ReactNode;
    fixtureId: FixtureId;
    initialFixtureState?: FixtureState;
    fixtureItem: FixtureListItem;
    fixtureOptions: {};
    lazy: boolean;
};
export declare function FixtureProvider(props: Props): React.JSX.Element;
export {};
