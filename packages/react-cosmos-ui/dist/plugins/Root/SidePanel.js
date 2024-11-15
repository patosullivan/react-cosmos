import React from 'react';
import styled from 'styled-components';
import { SidePanelRowSlot } from '../../slots/SidePanelRowSlot.js';
import { grey32 } from '../../style/colors.js';
export const SidePanel = React.memo(function SidePanel({ fixtureId, getFixtureState, setFixtureState, sidePanelRowOrder, }) {
    const slotProps = React.useMemo(() => ({ fixtureId, getFixtureState, setFixtureState }), [fixtureId, getFixtureState, setFixtureState]);
    return (React.createElement(Container, null,
        React.createElement(Content, null,
            React.createElement(SidePanelRowSlot, { slotProps: slotProps, plugOrder: sidePanelRowOrder }))));
});
const Container = styled.div `
  height: 100%;
  padding: 0 0 0 1px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${grey32};
`;
// The background color is required for the proper scroll bar color theme
const Content = styled.div `
  width: 100%;
  max-height: 100%;
  background: ${grey32};
  overflow-x: hidden;
  overflow-y: auto;
`;
