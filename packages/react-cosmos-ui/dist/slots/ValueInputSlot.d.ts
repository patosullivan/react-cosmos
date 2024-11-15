import React, { ReactNode } from 'react';
import { FixtureStatePrimitiveValue, FixtureStateUnserializableValue, PrimitiveData } from 'react-cosmos-core';
type LeafValue = FixtureStatePrimitiveValue | FixtureStateUnserializableValue;
export type ValueInputSlotProps = {
    id: string;
    name: string;
    value: LeafValue;
    indentLevel: number;
    onChange: (data: PrimitiveData) => unknown;
};
type Props = {
    children: ReactNode;
    slotProps: ValueInputSlotProps;
};
export declare function ValueInputSlot({ children, slotProps }: Props): React.JSX.Element;
export {};
