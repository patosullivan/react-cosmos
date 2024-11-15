import React from 'react';
import { DecoratorProps } from 'react-cosmos-core';
import { FixtureContextValue } from 'react-cosmos-renderer/client';
type State = {
    error: null | string;
};
export declare class ErrorCatch extends React.Component<DecoratorProps, State> {
    context: FixtureContextValue;
    static contextType: React.Context<FixtureContextValue>;
    prevContext: FixtureContextValue | null;
    static prevContext: null;
    state: State;
    componentDidCatch(error: Error, info: {
        componentStack: string;
    }): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: DecoratorProps): void;
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
    renderError(error: string): React.JSX.Element;
}
export {};
