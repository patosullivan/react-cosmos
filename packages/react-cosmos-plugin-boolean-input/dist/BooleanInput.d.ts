import React from 'react';
type Props = {
    name: string;
    checked: boolean;
    indentLevel: number;
    onChange: (value: boolean) => unknown;
};
export declare function BooleanInput({ indentLevel, name, checked, onChange }: Props): React.JSX.Element;
export {};
