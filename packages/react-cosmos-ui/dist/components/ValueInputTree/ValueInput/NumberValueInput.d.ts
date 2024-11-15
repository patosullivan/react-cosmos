import React from 'react';
type Props = {
    id: string;
    name: string;
    data: number;
    onChange: (newValue: number) => unknown;
};
export declare function NumberValueInput({ id, name, data, onChange }: Props): React.JSX.Element;
export {};
