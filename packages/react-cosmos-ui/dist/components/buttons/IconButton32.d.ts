import React from 'react';
type Props = {
    icon: React.ReactNode;
    title: string;
    disabled?: boolean;
    selected?: boolean;
    onClick?: () => unknown;
};
export declare function IconButton32({ icon, title, disabled, selected, onClick, }: Props): React.JSX.Element;
export {};
