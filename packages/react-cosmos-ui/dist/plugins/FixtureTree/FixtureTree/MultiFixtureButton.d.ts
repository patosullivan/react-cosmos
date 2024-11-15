import React, { RefObject } from 'react';
import { FixtureId } from 'react-cosmos-core';
type Props = {
    name: string;
    fixturePath: string;
    fixtureNames: string[];
    indentLevel: number;
    selected: boolean;
    selectedFixtureId: null | FixtureId;
    selectedRef: RefObject<HTMLElement>;
    onSelect: (fixtureId: FixtureId) => unknown;
};
export declare function MultiFixtureButton({ name, fixturePath, fixtureNames, indentLevel, selected, selectedFixtureId, selectedRef, onSelect, }: Props): React.JSX.Element;
export {};
