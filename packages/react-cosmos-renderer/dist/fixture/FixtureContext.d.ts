import React from 'react';
import { FixtureState, SetFixtureState } from 'react-cosmos-core';
export type FixtureContextValue = {
    fixtureState: FixtureState;
    setFixtureState: SetFixtureState;
};
export declare const FixtureContext: React.Context<FixtureContextValue>;
