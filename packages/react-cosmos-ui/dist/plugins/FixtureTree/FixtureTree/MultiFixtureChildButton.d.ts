import React, { RefObject } from 'react';
import { FixtureId } from 'react-cosmos-core';
type Props = {
    name: string;
    fixtureId: FixtureId;
    indentLevel: number;
    selected: boolean;
    selectedRef: RefObject<HTMLElement>;
    onSelect: (fixtureId: FixtureId) => unknown;
};
export declare function MultiFixtureChildButton({ name, fixtureId, indentLevel, selected, selectedRef, onSelect, }: Props): React.JSX.Element;
export {};
