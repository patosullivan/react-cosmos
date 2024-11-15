import React from 'react';
import { ReactDecorator, ReactDecoratorModule, ReactFixture } from 'react-cosmos-core';
type Props = {
    fixture: ReactFixture;
    fixtureOptions: {};
    userDecoratorModules: ReactDecoratorModule[];
    globalDecorators?: ReactDecorator[];
};
export declare function DecoratedFixture({ fixture, fixtureOptions, userDecoratorModules, globalDecorators, }: Props): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export {};
