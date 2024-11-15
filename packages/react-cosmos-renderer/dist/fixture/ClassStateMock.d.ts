import React from 'react';
type Props = {
    children: React.ClassicElement<unknown>;
    state?: {};
};
export declare class ClassStateMock extends React.Component<Props> {
    static cosmosCapture: boolean;
    childRef: React.Component | null;
    render(): React.CElement<unknown, React.Component<{}, {}, any>>;
    componentDidUpdate(prevProps: Props): void;
    handleRef: (childRef: React.Component | null) => void;
}
export {};
