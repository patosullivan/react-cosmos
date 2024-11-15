import React from 'react';
import { FixtureId, FixtureState, ReactDecorator, ReactDecoratorModule, ReactFixtureModule } from 'react-cosmos-core';
type Props = {
    fixtureModule: ReactFixtureModule;
    decoratorModules: ReactDecoratorModule[];
    globalDecorators?: ReactDecorator[];
    fixtureId: FixtureId;
    initialFixtureState?: FixtureState;
    renderKey: number;
    lazy: boolean;
    renderMessage: (msg: string) => React.ReactNode;
};
export declare function FixtureModule({ fixtureModule, decoratorModules, globalDecorators, fixtureId, initialFixtureState, renderKey, lazy, renderMessage, }: Props): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | React.JSX.Element | null | undefined;
export {};
