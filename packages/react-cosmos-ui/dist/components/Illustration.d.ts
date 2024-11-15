import React from 'react';
import { SvgChildren } from './BaseSvg.js';
type Props = {
    children: SvgChildren;
    viewBox: string;
    size?: number | string;
};
export declare function Illustration({ children, viewBox, size }: Props): React.JSX.Element;
export {};
