import React from 'react';
import styled from 'styled-components';
import { BlankCanvasIllustration } from '../../../components/illustrations/BlankCanvas.js';
import { screenGrey3 } from '../../../style/colors.js';
import { IllustrationContainer, OverlayBody, OverlayContainer, SecondaryButton, TextContainer, } from './ContentOverlay.js';
import { KeyShortcut } from './KeyShortcut.js';
export function NoFixtureSelected({ onShowWelcome }) {
    return (React.createElement(OverlayContainer, { "data-testid": "blank" },
        React.createElement(OverlayBody, null,
            React.createElement(TextContainer, null,
                React.createElement(KeyShortcut, { keys: ['⌘', 'K'], label: "Search fixtures" }),
                React.createElement(SubtitleContainer, null,
                    React.createElement("div", { style: { flex: 1 } }),
                    React.createElement(Subtitle, null, "ON SELECTED FIXTURE")),
                React.createElement(KeyShortcut, { keys: ['L'], label: "Toggle fixture list" }),
                React.createElement(KeyShortcut, { keys: ['P'], label: "Toggle control panel" }),
                React.createElement(KeyShortcut, { keys: ['F'], label: "Go full screen" }),
                React.createElement(KeyShortcut, { keys: ['R'], label: "Reload renderer" })),
            React.createElement(IllustrationContainer, null,
                React.createElement(BlankCanvasIllustration, { title: "blank state" }))),
        React.createElement(ShowWelcomeButton, { onClick: onShowWelcome }, "show welcome screen")));
}
const SubtitleContainer = styled.div `
  margin: 40px 0 24px 0;
  display: flex;
  flex-direction: row;
`;
const Subtitle = styled.div `
  flex: 1.4;
  color: ${screenGrey3};
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  text-align: left;
  text-indent: -26px;
  letter-spacing: 0.5px;
`;
const ShowWelcomeButton = styled(SecondaryButton) `
  position: absolute;
  bottom: 8px;
  right: 8px;
`;
