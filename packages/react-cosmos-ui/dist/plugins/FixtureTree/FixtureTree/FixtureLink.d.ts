import React, { ReactNode } from 'react';
import { FixtureId } from 'react-cosmos-core';
type Props = {
    children: ReactNode;
    fixtureId: FixtureId;
    onSelect: (fixtureId: FixtureId) => unknown;
};
export declare function FixtureLink({ children, fixtureId, onSelect }: Props): React.JSX.Element;
export {};
