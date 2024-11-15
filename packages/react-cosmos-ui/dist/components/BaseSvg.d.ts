import React from 'react';
export type SvgElementType = React.ReactElement<'path' | 'polyline' | 'line' | 'circle' | 'ellipse' | 'rect' | 'polygon' | 'g' | 'defs' | 'title'>;
export type SvgChildren = SvgElementType | SvgElementType[];
type Props = {
    children: SvgChildren;
    [attr: string]: unknown;
};
export declare function BaseSvg({ children, ...attrs }: Props): React.JSX.Element;
export {};
