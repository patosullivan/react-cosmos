import React from 'react';
import { IconButton32 } from '../../components/buttons/index.js';
import { ExternalIcon } from '../../components/icons/index.js';
export function FullScreenButton({ onClick }) {
    return (React.createElement(IconButton32, { icon: React.createElement(ExternalIcon, null), title: "Go fullscreen (F)", onClick: onClick }));
}
