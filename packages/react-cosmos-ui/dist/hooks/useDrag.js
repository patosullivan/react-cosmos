import { useCallback, useEffect, useRef, useState } from 'react';
export function useDrag({ value, direction = 'horizontal', reverse = false, double = false, min = 0, max = 99999, onChange, }) {
    const [dragState, setDragState] = useState(null);
    const handleDrag = useCallback((e) => {
        if (dragState) {
            const { startValue, startOffset } = dragState;
            let diff = direction === 'horizontal'
                ? e.clientX - startOffset
                : e.clientY - startOffset;
            if (reverse)
                diff *= -1;
            if (double)
                diff *= 2;
            const curValue = Math.min(max, Math.max(min, startValue + diff));
            onChange(curValue);
        }
    }, [direction, double, dragState, max, min, onChange, reverse]);
    const handleDragEnd = useCallback(() => {
        setDragState(null);
    }, []);
    const handleDragStart = useCallback((e) => {
        setDragState({
            startValue: value,
            startOffset: direction === 'horizontal' ? e.clientX : e.clientY,
        });
    }, [direction, value]);
    useEffect(() => {
        if (dragState) {
            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', handleDragEnd);
            return () => {
                document.removeEventListener('mousemove', handleDrag);
                document.removeEventListener('mouseup', handleDragEnd);
            };
        }
    }, [dragState, handleDrag, handleDragEnd]);
    // The returned ref callback will be re-created whenever the "value" arg
    // changes (because handleDragStart depends on it). Even if a DOM node stays
    // constant, whenever we pass a new ref callback to its element React will
    // call it again. The following code ensures:
    //   1. Proper cleanup on unmount
    //   2. The 'mousedown' events is never attached more than once
    // Safety aside, if re-creating the ref callback so often proves to be a perf
    // concern, we can make handleDragStart depend on a constant ref that stays
    // in sync with "value".
    const onUnmount = useRef(null);
    const dragElRef = useCallback((elRef) => {
        if (elRef) {
            elRef.addEventListener('mousedown', handleDragStart);
            onUnmount.current = () => elRef.removeEventListener('mousedown', handleDragStart);
        }
        else if (onUnmount.current) {
            onUnmount.current();
            onUnmount.current = null;
        }
    }, [handleDragStart]);
    return { dragElRef, dragging: dragState !== null };
}
