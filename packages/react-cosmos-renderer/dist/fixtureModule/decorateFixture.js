import React from 'react';
export function decorateFixture(fixtureNode, fixtureOptions, decorators) {
    return (React.createElement(React.Fragment, null, [...decorators].reverse().reduce((prevElement, Decorator) => (React.createElement(Decorator, { options: fixtureOptions }, prevElement)), fixtureNode)));
}
