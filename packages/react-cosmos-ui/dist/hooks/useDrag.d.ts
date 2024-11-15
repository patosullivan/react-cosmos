type UseDragArgs = {
    value: number;
    direction?: 'horizontal' | 'vertical';
    reverse?: boolean;
    double?: boolean;
    min?: number;
    max?: number;
    onChange: (value: number) => unknown;
};
export declare function useDrag({ value, direction, reverse, double, min, max, onChange, }: UseDragArgs): {
    dragElRef: (elRef: HTMLElement | null) => void;
    dragging: boolean;
};
export {};
