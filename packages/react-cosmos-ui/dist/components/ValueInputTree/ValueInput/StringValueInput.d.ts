import React from 'react';
type Props = {
    id: string;
    name: string;
    data: string;
    onChange: (data: string) => unknown;
};
export declare function StringValueInput({ id, name, data, onChange }: Props): React.JSX.Element;
export {};
