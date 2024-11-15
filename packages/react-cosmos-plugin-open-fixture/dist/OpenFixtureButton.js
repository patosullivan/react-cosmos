import React from 'react';
import { EditIcon, IconButton32 } from 'react-cosmos-ui';
export function OpenFixtureButton({ onClick }) {
    return (React.createElement(IconButton32, { icon: React.createElement(EditIcon, null), title: "Open fixture source (S)", onClick: onClick }));
}
