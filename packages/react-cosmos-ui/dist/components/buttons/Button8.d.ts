import React from 'react';
type Props = {
    icon?: React.ReactNode;
    title?: string;
    label: React.ReactNode;
    disabled?: boolean;
    selected?: boolean;
    onClick?: () => unknown;
};
export declare function Button8({ icon, label, title, disabled, selected, onClick, }: Props): React.JSX.Element;
export {};
