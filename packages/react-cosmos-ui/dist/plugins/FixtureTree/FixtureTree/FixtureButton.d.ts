import React, { RefObject } from 'react';
import { FixtureId } from 'react-cosmos-core';
type Props = {
    name: string;
    fixturePath: string;
    indentLevel: number;
    selected: boolean;
    selectedRef: RefObject<HTMLElement>;
    onSelect: (fixtureId: FixtureId) => unknown;
};
export declare function FixtureButton({ name, fixturePath, indentLevel, selected, selectedRef, onSelect, }: Props): React.JSX.Element;
export {};
