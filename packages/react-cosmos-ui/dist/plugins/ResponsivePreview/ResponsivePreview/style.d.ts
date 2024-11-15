import { Viewport } from 'react-cosmos-core';
export declare const responsivePreviewPadding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
};
export declare const responsivePreviewBorderWidth = 1;
export declare const stretchStyle: {
    display: string;
    flex: number;
};
export declare function getStyles({ container, viewport, scaled, }: {
    container: Viewport;
    viewport: Viewport;
    scaled: boolean;
}): {
    maskContainerStyle: {
        flex: number;
        display: string;
        justifyContent: string;
        alignItems: string;
        overflow: string;
    };
    padContainerStyle: {
        readonly position: "relative";
        readonly paddingTop: number;
        readonly paddingBottom: number;
        readonly paddingLeft: number;
        readonly paddingRight: number;
    };
    alignContainerStyle: {
        width: number;
        height: number;
        border: string;
        overflow: string;
    };
    scaleContainerStyle: {
        width: number;
        height: number;
        transformOrigin: string;
        transform: string;
    };
};
export declare function getViewportScaleFactor(viewport: Viewport, container: Viewport): number;
